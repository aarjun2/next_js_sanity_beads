import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY || '';

const stripe = new Stripe(key, {
    apiVersion: '2022-11-15'
});

export async function POST(request:NextRequest) {
    const body = await request.json();
    try {
        if(body.length > 0) {
            // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            line_items: body.map((item: any) => {
                return {
                    price_data: {
                        currency: 'USD',
                        product_data: {
                            name: item.product,

                        },
                        unit_amount: item.price * 100,
                    },
                    quantity: item.amount,
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                        maximum: 10,
                      },
                };
            }),
            success_url: `${request.headers.get('origin')}/success`,
            cancel_url: `${request.headers.get('origin')}/?canceled=true`,
          });
          return NextResponse.json({session});
        }
        else {
            return NextResponse.json({ message: "No data found"});
        }
      } catch (err) {
        console.log(err);
        return NextResponse.json(err.message);
      }
}
