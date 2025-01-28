'use server'
import prisma from '@/prisma/prisma'

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
        const cashier = await prisma.cashier.findUnique({
            where: { email: email },
        })
        return cashier
    } catch (error) {
        console.log('We faced an error getting the Cashier ' + error)
    }
}

export const getCustomer = async (customerId: string) => {
    try {
        const customer = await prisma.customer.findUnique({
            where: { id: customerId },
        })
        return customer
    } catch (error) {
        console.log('Getting Customer Error: ' + error)
    }
}

export const createRandomCustomer = async (
    customerId: string,
    businessLocationId: string
) => {
    try {
        const customer =
            customerId === 'random'
                ? await prisma.customer.findFirst({
                      where: { name: 'random' },
                  })
                : await getCustomer(customerId)

        if (customer) return customer

        const createdcustomer = await prisma.customer.create({
            data: {
                name: `random`,
                mobile: `0700238239`,
                businessLocationId: businessLocationId,
            },
        })

        return createdcustomer
    } catch (error) {
        console.log('Creating Customer Error: ' + error)
    }
}

export const createCashier = async (data: {
    email: string
    userId: string
    businessId: string
    businessLocationId: string
}) => {
    try {
        const cashier = await getCashier(data.email)
        if (cashier) return cashier
        const createdcashier = await prisma.cashier.create({
            data: { ...data, status: 'approved' },
        })
        return createdcashier
    } catch (error) {
        console.log('Creating Cashier Error ' + error)
    }
}

export const onboardCashier = async (email: string, id: string) => {
    try {
        const cashier = await getCashier(email)
        if (!cashier) return
        if (cashier.status === 'approved') return cashier
        const onboard = await prisma.cashier.update({
            where: { id: cashier.id },
            data: {
                userid: id,
                status: 'approved',
            },
        })
        return onboard
    } catch (error) {
        console.log('We faced an error onboarding a new cashier ' + error)
    }
}
