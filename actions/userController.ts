import prisma from "@/prisma/prisma"

export const getUser = async (userId: string) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: userId } })
        return user
    } catch (error) {
        console.log('We faced an error getting the user ' + error)
    }
}

export const getCashier = async (email: string) => {
    try {
        const cashier = await prisma.cashier.findUnique({ where: { email: email } })
        return cashier
    } catch (error) {
        console.log('We faced an error getting the Cashier ' + error)
    }
} 

export const onboardCashier = async (email: string, id: string) => {
    try {
        const cashier = await getCashier(email)
        if(!cashier) return 
        if(cashier.status === 'approved') return cashier
        const onboard = await prisma.cashier.update({
            where: { id: cashier.id },
            data: { 
                userid: id,
                status: 'approved' 
            } 
        })
        return onboard
    } catch (error) {
        console.log('We faced an error onboarding a new cashier ' + error)
    }
}