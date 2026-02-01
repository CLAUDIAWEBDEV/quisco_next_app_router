"use server"


import { prisma } from "@/src/lib/prisma"
import { OrderIdSchema } from "@/src/schema"
import { revalidatePath } from "next/cache"

export async function completeOrder(formData: FormData) {
    //Los valores que vienen de un form siempre son string (para convertirlo a numero uso el +)
    // ! creeme ese valor si va a existir o hacerlo de la siguiente forma con schema de zod
      const data = {
        orderId : formData.get('order_id')
    }

    const result = OrderIdSchema.safeParse(data)

    if(result.success) {
        try {
            await prisma.order.update({
                where: {
                    id: result.data.orderId
                },
                data: {
                    status: true,
                    orderReadyAt: new Date(Date.now())
                }
            })
//Revalidacion a una url es un refresh
            revalidatePath('/admin/orders')
        } catch (error) {
            console.log(error)
        }
    }
    

}