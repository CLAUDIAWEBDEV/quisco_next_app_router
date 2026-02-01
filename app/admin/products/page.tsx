import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

// saber cuantas paginas tendremos de acuerdo al numero de productos
async function productCount() {
  return await prisma.product.count()
}

async function gerProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize
  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true
    }
  })
  return products
}

//Genera el tipe  en base al query en el que estoy trabajando
export type ProductsWithCategory = Awaited<ReturnType<typeof gerProducts>>

export default async function ProductsPage({ searchParams }: { searchParams: { page: string } }) {
  //Va a ser un numero y si no existe va a iniciar en la pag 1
  const page = +searchParams.page || 1
  const pageSize = 10
  //Condicion que se ejecuta antes de validar consultas prisma
  if (page < 0) redirect("/admin/products")
  //Consultas independientes pueden ejecutarse al mismo tiempo, no depende una de la otra
  const productsData = await gerProducts(page, pageSize)
  const totalProductsData = await productCount()
  const [products, totalProducts] = await Promise.all([productsData, totalProductsData])

  //Con la funcion math.ceil : fuerzo a que el redondeo decimal sea para arriba
  const totalPages = Math.ceil(totalProducts / pageSize)

  if (page > totalPages) redirect("/admin/products")

  return (
    <>
      <Heading>
        Administrar Productos
      </Heading>

      <div className='flex flex-col lg:flex-row lg:justify-between gap-5'>
        <Link
          href={'/admin/products/new'}
          className='bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer'
        >Crear Producto</Link>

        <ProductSearchForm />
      </div>
      <ProductTable
        products={products} />
      <ProductsPagination
        page={page}
        totalPages={totalPages} />
    </>
  )
}
