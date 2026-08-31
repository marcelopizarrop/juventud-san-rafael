import Image from "next/image";

/**
 * Muestra una foto SIN recortarla, sin importar si es horizontal,
 * vertical o cuadrada: la foto completa queda centrada (object-contain)
 * y el espacio sobrante se rellena con una versión difuminada de la
 * misma foto, así nunca se ve una barra vacía ni se pierde parte de
 * la imagen.
 *
 * Debe usarse dentro de un contenedor con `position: relative` y un
 * tamaño definido (por ejemplo `relative w-full aspect-[4/3]`).
 */
export default function FotoAdaptativa({
  src,
  alt,
  priority = false,
  sizes
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <>
      <Image
        src={src}
        alt=""
        aria-hidden
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover scale-110 blur-2xl brightness-[0.55] saturate-150"
      />
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-contain drop-shadow-lg"
      />
    </>
  );
}
