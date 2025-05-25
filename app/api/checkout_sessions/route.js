import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '@/libs/stripe'

export async function POST(req) {
    try {
        const body = await req.json()
        const { discountedPrice } = body

        if (!discountedPrice || discountedPrice <= 0) {
            return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
        }

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'rub',
                        product_data: {
                            name: 'Оплата заказа',
                        },
                        unit_amount: Math.round(discountedPrice * 100), // в копейках
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:3000/?canceled=true',
        })

        return NextResponse.json({ url: session.url })
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }

}