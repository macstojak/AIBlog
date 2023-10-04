// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSession } from "@auth0/nextjs-auth0"
import clientPromise from './../../../lib/mongodb';
import stripeInit from "stripe";

const stripe = stripeInit(process.env.STRIPE_SECRET_KEY);

export default async function addTokens(req, res) {
    const {user} = await getSession(req, res);

    

    console.log("user", user);
    const client = await clientPromise;
    const db = client.db("BlogAI");
    const userProfile = await db.collection("users").updateOne({
        auth0Id: user.sub,
    }, {
        $inc: {
            availableTokens: 10
        },
        $setOnInsert: {
            auth0Id: user.sub
        }
    }, {upsert: true});
    res.status(200).json({ name: 'John Doe' })
  }
  