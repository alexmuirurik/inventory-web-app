import prisma from "@/prisma/prisma"

export async function POST(request: Request) {
	const req = await request.json()
	if (req.stkCallback.ResultCode !== 0) return
	const CheckoutRequestID = req.stkCallback.CheckoutRequestID
	const MerchantRequestID = req.stkCallback.MerchantRequestID
	const MpesaReceiptNumber = req.stkCallback.CallbackMetadata.Item[2].Value
	const subscription = await prisma.subscription.findFirst({
		where: {
			CheckoutRequestID: CheckoutRequestID,
			MerchantRequestID: MerchantRequestID
		}
	})
	if (!subscription) return
	await prisma.subscription.update({
		where: { id: subscription.id },
		data: {
			MpesaReceiptNumber: MpesaReceiptNumber,
			status: 'paid'
		}
	})
	return await prisma.business.update({
		where: { id: subscription.businessId as string },
		data: { subscription: 'active' }
	})

}