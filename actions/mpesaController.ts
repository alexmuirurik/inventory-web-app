'use server'
export const sendSTKRequest = async (mobileNumber: string) => {
    try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer 7HwUY73EAFow1ebIJYHj87qvwb7c");

        const request = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
            method: 'Post',
            headers: headers,
            body: JSON.stringify({
                "BusinessShortCode": 174379,
                "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQxMDEwMjE1OTIw",
                "Timestamp": "20241010215920",
                "TransactionType": "CustomerPayBillOnline",
                "Amount": 1,
                "PartyA": 254708374149,
                "PartyB": 174379,
                "PhoneNumber": 254708374149,
                "CallBackURL": "https://inventory-pearl.vercel.app//api/mpesasubscription",
                "AccountReference": "CompanyXLTD",
                "TransactionDesc": "Payment of X"
            })
        })
        const response = await request.json()
        return response
    } catch (error) {
        console.log('Sending Mpesa STK Error:' + error)
    }
}