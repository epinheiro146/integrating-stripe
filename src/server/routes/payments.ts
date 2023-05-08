import * as express from "express";
import { stripe as stripeConf } from "../config";
import stripe from 'stripe';

const router = express.Router();

router.post('/', async (req, res) => {
    const { paymentMethod, amount } = req.body;
    try {
        const client = new stripe(stripeConf.key!, { apiVersion: '2022-11-15' });

        const results = await client.paymentIntents.create({
            payment_method: paymentMethod.paymentMethod.id,
            amount: amount * 100,
            currency: 'usd',
            confirm: true
        })

        res.json({ message: "Your donation has been submitted.", results })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong.", error })
    }
});

export default router;