import prisma from "@/prisma/prisma"

export async function POST(request: Request) {
	const req = await request.json()
	console.log(req)
	const CheckoutRequestID = req.stkCallback.CheckoutRequestID
	const MerchantRequestID = req.stkCallback.MerchantRequestID
	const subscription = await prisma.subscription.findFirst({
		where: {
			CheckoutRequestID: CheckoutRequestID,
			MerchantRequestID: MerchantRequestID
		}
	})
	if (req.stkCallback.ResultCode !== 0) {
		await prisma.subscription.delete({where: {id: subscription?.id } })
		return new Response('')
	} 
	if (!subscription) return new Response('')
	const MpesaReceiptNumber = req.stkCallback.CallbackMetadata.Item[2].Value
	await prisma.subscription.update({
		where: { id: subscription.id },
		data: {
			MpesaReceiptNumber: MpesaReceiptNumber,
			status: 'paid'
		}
	})
	await prisma.business.update({
		where: { id: subscription.businessId as string },
		data: { subscription: 'active' }
	})
	return new Response('')
}