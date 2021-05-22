import { query as db } from 'faunadb'

import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import { fauna } from '../../../services/fauna';

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET_ID
    })
  ],
  callbacks: {
    async session(session) {
      try {
        const userActiveSubscription = await fauna.query(
          db.Get(
            db.Intersection([
              db.Match(
                db.Index('subscription_by_user_ref'),
                db.Select(
                  'ref',
                  db.Get(
                    db.Match(
                      db.Index('user_by_email'),
                      db.Casefold(session.user.email)
                    )
                  )
                )
              ),
              db.Match(
                db.Index('subscription_by_status'),
                'active'
              ) 
            ])
          )
        )
        return {
          ...session,
          activeSubscription: userActiveSubscription
        };
      } catch {
        return session;
      }
    },
    async signIn(user, account, profile) {
      const { email } = user;


      try {
        await fauna.query(
          db.If(
            db.Not(
              db.Exists(
                db.Match(
                  db.Index('user_by_email'),
                  db.Casefold(email)
                )
              )
            ),
            db.Create(
              db.Collection('users'),
              { data: { email } }
            ),
            db.Get(
              db.Match(
                db.Index('user_by_email'),
                db.Casefold(email)
              )
            )
          )
        )
  
        return true;
      } catch {
        return false;
      } 
    }
  }
})