import { PrismaClientExtends } from "@prisma/client/extension"
import { categories } from "./data/categories"
import { products } from "./data/products"
import { PrismaClient } from '@/src/generated/prisma/client'


const prisma = new PrismaClient()

//Inyecta categorias y productos
async function main() {
    try {
        await prisma.category.createMany({
            data: categories
        })
        await prisma.product.createMany({
            data: products})
            console.log("seed ejecutado correctamente")
        } catch (error) {
            console.log(error)
        }

    }

    //Mando a llamar main y cierro de forma segura la coneccion de prisma
    main()
    .then( async () => {
        await prisma.$disconnect()
    })
    .catch( async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })