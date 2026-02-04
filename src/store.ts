import { create } from "zustand"
import { OrderItem } from "./types"
import { Product } from "@/src/generated/prisma"

interface Store {
    order: OrderItem[]
    addToOrder: (product: Product) => void
    increaseQuantity: (id: Product["id"]) => void
    decreaseQuantity: (id: Product["id"]) => void
    removeItem: (id: Product["id"]) => void
    clearOrder: () => void
}

export const useStore = create<Store>((set, get) => ({
    //Orden inicia como vacio
    order: [],
    //Forma uno de llamar la funcion
    //Agregar producto al carrito
    addToOrder: (product) => {
        //Desestructuración de objetos
        const {...data } = product 
        let order: OrderItem[] = []
        if (get().order.find(item => item.id === product.id)) {
            order = get().order.map(item => item.id === product.id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item)
        } else {
            order = [...get().order, {
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]
        }
        set(() => ({
            order
        }))
    },
    //Forma dos de llamar la funcion
    increaseQuantity: (id) => {
        set((state) => ({
            order: state.order.map(item => item.id === id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item)
        }))
    },
    decreaseQuantity: (id) => {
        const order = get().order.map(item => item.id === id ? {
            ...item,
            quantity: item.quantity - 1,
            subtotal: item.price * (item.quantity - 1)
        } : item)

        set(() => ({
            order
        }))
    },
    removeItem: (id) => {
        set((state) => ({
             order: state.order.filter(item => item.id !== id)
        }))
    },
    clearOrder: () => {
        set(() => ({
            order: []
        }))
    }
}))

//Sila logica es grade lo hago fuera del set como la forma 1 y si es corta lo hago dentro como la forma 2