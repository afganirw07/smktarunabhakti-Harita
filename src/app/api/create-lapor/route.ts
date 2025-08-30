// app/api/midtrans/route.ts
import { NextResponse } from 'next/server';
import Midtrans from 'midtrans-client';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// ENV
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY!;
const MIDTRANS_CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!;

// Supabase & Midtrans
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: MIDTRANS_SERVER_KEY,
    clientKey: MIDTRANS_CLIENT_KEY,
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // --- Jika request dari frontend: buat transaksi Snap ---
        if (body.order_id && body.gross_amount && body.customer_details && body.item_details) {
            const { order_id, gross_amount, customer_details, item_details } = body;

            const parameter = {
                transaction_details: {
                    order_id,
                    gross_amount: parseInt(gross_amount.toString()),
                },
                credit_card: { secure: true },
                customer_details: {
                    first_name: customer_details.first_name || '',
                    last_name: customer_details.last_name || '',
                    email: customer_details.email || '',
                    phone: customer_details.phone || '',
                },
                item_details: item_details.map((item: any) => ({
                    id: item.id || '',
                    price: parseInt(item.price.toString()),
                    quantity: item.quantity || 1,
                    name: item.name || '',
                })),
                callbacks: {
                    finish: `${process.env.NEXT_PUBLIC_BASE_URL}/user/home`,
                    error: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/error`,
                    pending: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/pending`,
                },
            };

            const transaction = await snap.createTransaction(parameter);
            const transactionToken = transaction.token;

            // Tidak menyimpan ke tabel transactions lagi
            return NextResponse.json({ token: transactionToken });
        }

        // --- Jika request dari Midtrans webhook ---
        const orderId = body.order_id;
        const transactionStatus = body.transaction_status;
        const fraudStatus = body.fraud_status;
        const signatureKey = body.signature_key;

        const stringToHash = `${orderId}${body.status_code}${body.gross_amount}${MIDTRANS_SERVER_KEY}`;
        const hashedSignature = crypto.createHash('sha512').update(stringToHash).digest('hex');

        if (hashedSignature !== signatureKey) {
            console.error('Signature mismatch for Order ID:', orderId);
            return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
        }

        if (transactionStatus === 'settlement' && fraudStatus === 'accept') {
            // Simpan langsung ke laporan tanpa transactions
            const reportData = body.report_data; // pastikan frontend mengirim report_data di webhook

            if (!reportData) return NextResponse.json({ error: 'Report data missing' }, { status: 200 });

            await supabase.from('reports').insert([{
                user_id: reportData.userId,
                full_name: reportData.namaLengkap,
                phone_number: reportData.nomorHP,
                email: reportData.email,
                address: reportData.alamat,
                area_type: reportData.wilayah,
                description: reportData.deskripsi,
                total_cost: reportData.total_cost,
                status: 'Terkonfirmasi',
            }]);

            await supabase.from('notifications').insert({
                user_id: reportData.userId,
                title: 'Pembayaran & Laporan Berhasil!',
                body: `Laporan Anda untuk pembersihan sampah di ${reportData.alamat} telah berhasil dikonfirmasi.`,
                type: 'lapor_sampah',
            });

            return NextResponse.json({ message: 'Success' });
        } else {
            // Tidak menyimpan status ke transactions
            return NextResponse.json({ message: 'Status tidak memerlukan aksi' });
        }

    } catch (error: any) {
        console.error('Error Midtrans API/Webhook:', error.message || error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message || error }, { status: 500 });
    }
}
