'use server'

import { createBusinessSubscription } from "./businessController";

export const generateTimestamp = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

export const generateAccessToken = async () => {
    let authString = `${process.env.SAFARICOM_CONSUMER_KEY}:${process.env.SAFARICOM_CONSUMER_SECRET}`
    let headers = new Headers()
    headers.set('Authorization', 'Basic ' + btoa(authString))
    try {
        const req = await fetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", { headers: headers });
        const res = await req.json();
        return res.access_token
    } catch (error) {
        console.log('Generating Access Token Error ' + error)
    }
}

export const initiateMPesaPayment = async (amount: number, phone: string, businessId: string) => {
    try {
        const access_token = await generateAccessToken()
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${access_token} `);
        const req = await fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
            method: 'POST',
            headers,
            body: JSON.stringify({
                "BusinessShortCode": 174379,
                "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQxMDEyMTQ1NDU2",
                "Timestamp": "20241012145456",
                "TransactionType": "CustomerPayBillOnline",
                "Amount": amount,
                "PartyA": phone,
                "PartyB": 174379,
                "PhoneNumber": phone,
                "CallBackURL": "https://inventory-pearl.vercel.app/api/mpesasubscription",
                "AccountReference": "CompanyXLTD",
                "TransactionDesc": "Payment of X. Refundable"
            })
        })
        const res = await req.json()
        if (res.ResponseCode !== '0') return
        const MerchantRequestID = res.MerchantRequestID
        const CheckoutRequestID = res.CheckoutRequestID
        const subscription = await createBusinessSubscription(amount, phone, 'monthly', businessId, MerchantRequestID, CheckoutRequestID)
        return subscription
    } catch (error) {
        console.log('Initiating Payment Error ' + error)
    }
}
