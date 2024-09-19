import prisma from "@/prisma/prisma"

export const getSuppliers = async (businessLocationId: string) => {
    try {
        const suppliers = await prisma.supplier.findMany({ })
        return suppliers
    } catch (error) {
        console.log('Get Suppliers error: ' + error)
    }
}