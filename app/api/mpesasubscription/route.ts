import prisma from "@/prisma/prisma"

export async function POST(request: Request) {
	const reqs = await request.json()
	const body = reqs.Body
	const CheckoutRequestID = body.stkCallback.CheckoutRequestID
	const MerchantRequestID = body.stkCallback.MerchantRequestID
	const subscription = await prisma.subscription.findFirst({
		where: {
			CheckoutRequestID: CheckoutRequestID,
			MerchantRequestID: MerchantRequestID
		}
	})
	if (body.stkCallback.ResultCode !== 0) {
		await prisma.subscription.delete({where: {id: subscription?.id } })
		return new Response('')
	} 
	if (!subscription) return new Response('')
	const MpesaReceiptNumber = body.stkCallback.CallbackMetadata.Item[2].Value
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