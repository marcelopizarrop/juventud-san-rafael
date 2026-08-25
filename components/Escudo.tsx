import Image from "next/image";

export default function Escudo({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <span className={`relative inline-block rounded-full ${className}`}>
      <Image
        src="/escudo/logo.jpeg"
        alt="Escudo de Juventud San Rafael"
        fill
        className="object-contain"
        priority
      />
    </span>
  );
}
