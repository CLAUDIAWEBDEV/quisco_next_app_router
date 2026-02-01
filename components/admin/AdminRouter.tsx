"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminRouterProps = {
link: {
    url: string;
    text: string;
    blank: boolean;
}
}
export default function AdminRouter({link} : AdminRouterProps) {
  //Uso usePathname para detectar la ruta actual y marcar enlaces activos en la navegación
  const pathname = usePathname()
  const isActive = pathname.startsWith(link.url)
  return (
    <Link
      className={` ${isActive ? 'bg-amber-400' : ''}  font-bold text-lg border-t border-gray-200 p-3 last-of-type:border-b`}
      href={link.url}
      //Si el valor esta como true agrega la nueva pestaña de lo contrario nada
      target={link.blank ? '_blank' : ''}
    >{link.text}</Link>
  )
}
