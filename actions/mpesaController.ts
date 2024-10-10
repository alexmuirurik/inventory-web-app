'use server'
const sendSTKRequest = async () => {
    try {
        const request = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', { 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer gWDo0KVBqhK4sCVA22e2WgOdA0Ab'
            },
            body: JSON.stringify({
                "BusinessShortCode": 174379,
                "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQxMDEwMTE1MjQ5",
                "Timestamp": "20241010115249",
                "TransactionType": "CustomerPayBillOnline",
                "Amount": 1,
                "PartyA": 254700278347,
                "PartyB": 174379,
                "PhoneNumber": 254700278347,
                "CallBackURL": "https://mydomain.com/path",
                "AccountReference": "CompanyXLTD",
                "TransactionDesc": "Payment of X"
            })
        })
        const response  = await request.json()
        return response
    } catch (error) {
        console.log('Sending Mpesa STK Error:' + error)
    }
}