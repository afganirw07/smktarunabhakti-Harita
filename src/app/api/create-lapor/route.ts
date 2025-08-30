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
        const { order_id, gross_amount, customer_details, item_details, report_data } = body;

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
            finish: `${process.env.NEXT_PUBLIC_BASE_URL}/user/layanan/lapor`,
            error: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/error`,
            pending: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/pending`,
            },
            custom_field1: JSON.stringify(report_data), 
        };

        const transaction = await snap.createTransaction(parameter);
        return NextResponse.json({ token: transaction.token });
        }

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
        let formData;
        try {
            formData = JSON.parse(body.custom_field1);
        } catch (error) {
            console.error('Error parsing report data from webhook:', error);
            return NextResponse.json({ error: 'Invalid report data' }, { status: 400 });
        }

        if (!formData) return NextResponse.json({ error: 'Report data missing' }, { status: 400 });

        // Save report to database
        const { error: reportError } = await supabase.from('reports').insert([{
            user_id: formData.userId,
            full_name: formData.full_name,
            phone_number: formData.phone_number,
            email: formData.email,
            address: formData.address,
            area_type: formData.area_type,
            description: formData.description,
            total_cost: formData.total_cost,
            status: 'Terkonfirmasi',
            order_id: orderId,
        }]);

        if (reportError) console.error('Error saving report via webhook:', reportError);

        // Save notification
        await supabase.from('notifications').insert({
            user_id: formData.userId,
            title: 'Laporan Sampah Dikonfirmasi!',
            body: `Laporan pembersihan sampah di ${formData.address} telah dikonfirmasi melalui sistem.`,
            type: 'lapor_sampah',
        });

        return NextResponse.json({ message: 'Success' });
        }

        return NextResponse.json({ message: 'Status tidak memerlukan aksi' });
    } catch (error: any) {
        console.error('Error Midtrans API/Webhook:', error.message || error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message || error }, { status: 500 });
    }
    }
