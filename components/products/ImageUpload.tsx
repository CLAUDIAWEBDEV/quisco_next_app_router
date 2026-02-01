"use client"
import React, { useState } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import { TbPhotoPlus } from 'react-icons/tb'
import Image from 'next/image'
import { getImagePath } from '@/src/utils'

export default function ImageUpload({ image }: { image: string | undefined }) {
  const [imageUrl, setImageUrl] = useState("")
  return (
    <CldUploadWidget
      //Cuando la subida es exitosa, cierra el widget de Cloudinary y guarda la URL segura de la imagen en el estado.
      onSuccess={(result, { widget }) => {
        if (result.event === "success") {
          widget.close()
          //@ts-ignore  
          setImageUrl(result.info?.secure_url)
        }
      }}
      uploadPreset="unsigned_products"
      options={{
        maxFiles: 1
      }}
    >
      {({ open }) => (
        <>
          <div className='space-y-2'>
            <div className='relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100 '
              onClick={() => open()}
            >
              <label className='text-slate-800'>Imagen Producto</label>
              <TbPhotoPlus
                size={50} />
              <p className='text-lg font-semibold'>Agregar Imagen</p>
              {imageUrl && (
                //<div className='space-y-2'>
                // <label>Imagen Actual:</label>
                <div className='absolute insert-0 w-full h-full'>
                  <Image
                    fill
                    style={{ objectFit: 'contain' }}
                    src={imageUrl}
                    alt="Imagen de Producto"
                  />
                </div>
                // </div>
              )}
            </div>
          </div>


          {image && !imageUrl && (
            <div className='space-y-2'>
              <label>Imagen Actual:</label>
              <div className='relative w-64 h-64'>
                <Image
                  fill
                  src={getImagePath(image)}
                  alt="Imagen Producto"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          )}


          <input
            type='hidden'
            name='image'
            //“Si el usuario subió una imagen nueva, envía esa Si no, mantén la imagen que ya estaba.”
            defaultValue={imageUrl ? imageUrl : image}
          />
        </>
      )}
    </CldUploadWidget>
  )
}


//“Muestra este <div> solo cuando hay una imagen antigua y todavía no se ha subido una imagen nueva.”