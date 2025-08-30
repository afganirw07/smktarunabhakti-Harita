// app/api/create-transaction/route.ts
import { NextResponse } from 'next/server';
import Midtrans from 'midtrans-client';
import { createClient } from '@supabase/supabase-js';

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

const planMapping: Record<string, string> = {
    '1 Bulan': '1 Bulan',
    '3 Bulan': '3 Bulan',
    '6 Bulan': '6 Bulan',
    '1 Tahun': '1 Tahun',
};

const planDuration: Record<string, number> = {
    '1 Bulan': 30,       // 1 bulan
    '3 Bulan': 90,       // 3 bulan
    '6 Bulan': 180,      // 6 bulan
    '1 Tahun': 365,      // 1 tahun
};


export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { order_id, gross_amount, customer_details, item_details } = body;

        if (!order_id || !gross_amount || !customer_details || !item_details?.length) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const userId = customer_details.id;
        if (!userId) {
            return NextResponse.json({ error: 'User ID missing' }, { status: 400 });
        }

        const planName = item_details[0].name;
        const enumPlanName = planMapping[planName];

        if (!enumPlanName) {
            return NextResponse.json({ error: `Plan ${planName} not mapped` }, { status: 400 });
        }

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
        // Ambil total_duration dari frontend, kalau tidak ada fallback ke default planDuration
        const durationDays = body.total_duration || planDuration[planName] || 30;
        const endDate = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString();


        const { error: dbError } = await supabase.from('transactions').insert([
            {
                user_id: userId,
                nama: customer_details.first_name + ' ' + customer_details.last_name || '',
                order_id,
                plan_name: planName,
                amount: gross_amount,
                status: 'Sukses',
                end_date: endDate,
            },
        ]);

        if (dbError) {
            console.error('Error saving transaction:', dbError);
            return NextResponse.json({ error: 'Failed to save transaction' }, { status: 500 });
        }

        const { error: updatePlanError } = await supabase
            .from('profiles')
            .update({
                plan: enumPlanName,
                end_date: endDate,
            })
            .eq('id', userId);


        if (updatePlanError) {
            console.error('Error updating user plan:', updatePlanError);
            return NextResponse.json({ error: 'Failed to update user plan' }, { status: 500 });
        }

        return NextResponse.json({ token: transactionToken });
    } catch (error: any) {
        console.error('Error creating transaction:', error.message);
        return NextResponse.json(
            { error: 'Failed to create transaction', details: error.message },
            { status: 500 }
        );
    }
}
