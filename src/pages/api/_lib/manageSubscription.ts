import { query as db } from 'faunadb';
import { fauna } from "../../../services/fauna";
import { stripe } from '../../../services/stripe';

export async function saveSubscription(
    subscriptionId: string, 
    customerId: string,
    createAction = false
) {
    const userRef = await fauna.query(
        db.Select(
            'ref',
            db.Get(
                db.Match(
                    db.Index('user_by_stripe_customer_id'),
                    customerId
                )
            )
        )
    )

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const subscriptionData = {
        id: subscription.id,
        userId: userRef,
        status: subscription.status,
        price_id: subscription.items.data[0].price.id,
    }

    if(createAction) {
        await fauna.query(
            db.If(
                db.Not(
                    db.Exists(
                        db.Match(
                            db.Index('subscription_by_id'),
                            subscriptionId
                        )
                    )
                ),
                db.Create(
                    db.Collection('subscriptions'),
                    { data: subscriptionData }
                ),
                db.Get(
                    db.Match(
                        db.Index('subscriptions'),
                        subscriptionId
                    )
                )
            )
            // db.Create(
            //     db.Collection('subscriptions'),
            //     { data: subscriptionData }
            // )
        )
    } else {
        await fauna.query(
            db.Replace(
                db.Select(
                    'ref',
                    db.Get(
                        db.Match(
                            db.Index('subscription_by_id'),
                            subscriptionId
                        )
                    )
                ),
                { data: subscriptionData }
            )
        )
    }
}