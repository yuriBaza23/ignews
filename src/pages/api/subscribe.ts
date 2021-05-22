import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { fauna } from "../../services/fauna";
import { query as db } from 'faunadb';
import { stripe } from "../../services/stripe";

type User = {
    ref: {
        id: string;
    },
    data: { 
        stripe_customer_id: string;
    }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'POST') {
        const session = await getSession({ req })

        // Pegar o usuário que possui session.user.email como email no faunadb
        const user = await fauna.query<User>(
            db.Get(
                db.Match(
                    db.Index('user_by_email'),
                    db.Casefold(session.user.email)
                )
            )
        )

        let customerId = user.data.stripe_customer_id;

        if(!customerId) {
            const stripeCustomer = await stripe.customers.create({
                email: session.user.email
            })
    
            // Fazer um update no faunadb
            await fauna.query(
                db.Update(
                    db.Ref(db.Collection('users'), user.ref.id),
                    { 
                        data: { 
                            stripe_customer_id: stripeCustomer.id
                        }
                    }
                )
            )

            customerId = stripeCustomer.id;
        }


        const stripeChckoutSession = await stripe.checkout.sessions.create({
            customer: customerId,
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: [
                { price: 'price_1Irs71E0k9c3KGEpjMPrCsLX', quantity: 1 }
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUC_URL,
            cancel_url: process.env.STRIPE_CAN_URL
        })

        return res.status(200).json({ sessionId: stripeChckoutSession.id })
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method not allowed');
    }
}