import Image from "next/image";

type BrandNameProps = {
  alt: string;
  className?: string;
};

// The name always comes from the kit files. Only the file of the current mode
// is displayed, so a screen reader announces it once.
export function BrandName({ alt, className = "" }: BrandNameProps) {
  const size = { width: 1036, height: 220, unoptimized: true };

  return (
    <>
      <Image
        {...size}
        src="/brand/nome-escuro.svg"
        alt={alt}
        className={`light:hidden ${className}`}
      />
      <Image
        {...size}
        src="/brand/nome-claro.svg"
        alt={alt}
        className={`hidden light:block ${className}`}
      />
    </>
  );
}
