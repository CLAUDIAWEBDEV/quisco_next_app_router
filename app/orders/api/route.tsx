//obtiene las últimas 5 órdenes listas desde la base de datos usando Prisma. Devuelve las órdenes con sus productos relacionados,

import { prisma } from "@/src/lib/prisma";

export const dynamic = 'force-dynamic'

export async function GET() {
    const orders = await prisma.order.findMany({
        take: 5,
        where: {
            orderReadyAt: {
                not: null
            }
        },
        orderBy: {
            orderReadyAt: 'desc'
        },
        include: {
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
    })
    return Response.json(orders)
}   