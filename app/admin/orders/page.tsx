"use client"
import useSWR from 'swr'
import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { OrderWithProducts } from '@/src/types';




export default function OrderPage() {
    //convertir a json JSON.stringify(valor, replacer, space)
    //console.log(JSON.stringify(orders, null, 2))

    const url = '/admin/orders/api'
    //Funcion que obtiene datos de la Api
    const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
    const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
        //Carga despues del minuto 
        refreshInterval: 60000,
        //“No vuelvas a hacer el fetch automáticamente cuando el usuario regrese a la pestaña”
        revalidateOnFocus: false,

    })

    if (isLoading) return <p>Cargando...</p>

    if (data) return (
        <>
            <Heading>Administrar Ordenes</Heading>



            {data.length ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
                    {data.map(order => (
                        <OrderCard
                            key={order.id}
                            order={order}
                        />
                    ))}
                </div>
            ) : <p className="text-center"> No hay Ordenes Pendientes</p>
            }
        </>

    )
}
