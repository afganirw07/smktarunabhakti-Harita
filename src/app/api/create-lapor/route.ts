import { NextResponse } from 'next/server';
import Midtrans from 'midtrans-client';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY!;
const MIDTRANS_CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: MIDTRANS_SERVER_KEY,
  clientKey: MIDTRANS_CLIENT_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // === Case 1: Request dari frontend (buat transaksi) ===
    if (body.order_id && body.gross_amount) {
      const { order_id, gross_amount, customer_details, item_details, report_data } = body;

      const parameter = {
        transaction_details: {
          order_id,
          gross_amount: parseInt(gross_amount.toString()),
        },
        customer_details,
        item_details,
        custom_field1: JSON.stringify(report_data),
        callbacks: {
          finish: `${process.env.NEXT_PUBLIC_BASE_URL}/user/layanan/lapor`,
          error: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/error`,
          pending: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/pending`,
        },
      };

      const transaction = await snap.createTransaction(parameter);

      // ⏺ Insert awal ke Supabase (status: Menunggu)
      await supabase.from('reports').insert([{
        user_id: report_data.userId,
        full_name: report_data.full_name,
        phone_number: report_data.phone_number,
        email: report_data.email,
        address: report_data.address,
        area_type: report_data.area_type,
        description: report_data.description,
        total_cost: report_data.total_cost,
        status: 'Menunggu Pembayaran',
        order_id,
      }]);

      return NextResponse.json({ token: transaction.token });
    }

    // === Case 2: Webhook dari Midtrans ===
    const { order_id, transaction_status, fraud_status, signature_key, status_code, gross_amount } = body;

    const expectedSignature = crypto.createHash('sha512')
      .update(order_id + status_code + gross_amount + MIDTRANS_SERVER_KEY)
      .digest('hex');

    if (expectedSignature !== signature_key) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
    }

    if (transaction_status === 'settlement' && fraud_status === 'accept') {
      // ✅ Update jadi Terkonfirmasi
      await supabase.from('reports')
        .update({ status: 'Terkonfirmasi' })
        .eq('order_id', order_id);

      // Simpan notifikasi
      const report = await supabase.from('reports').select('*').eq('order_id', order_id).single();
      if (report.data) {
        await supabase.from('notifications').insert({
          user_id: report.data.user_id,
          title: 'Laporan Sampah Dikonfirmasi!',
          body: `Laporan pembersihan sampah di ${report.data.address} telah dikonfirmasi.`,
          type: 'lapor_sampah',
        });
      }
    }

    return NextResponse.json({ message: 'Webhook processed' });
  } catch (err: any) {
    console.error('❌ Error Midtrans:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
