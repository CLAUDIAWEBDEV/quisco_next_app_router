import { Order, OrderProducts, Product } from "../generated/prisma"

export type OrderItem = Pick<Product, "id" | "name" | "price"> & {
    quantity : number
    subtotal: number
}

//Inclye esos dos schemas y al final [] porque orderProducts esun array
export type OrderWithProducts = Order & {
    orderProducts: (OrderProducts & {
        product: Product
    })[]
}