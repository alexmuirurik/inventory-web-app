import prisma from "@/prisma/prisma"

export const getProduct = () => {

}

export const getManyProducts = async () => {
    try {
        const products = await prisma.product.findMany({  })
        return products
    } catch (error) {
        console.log('We faced an error getting many products ' + error)
    }
}

