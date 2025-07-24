import Image, { StaticImageData } from "next/image";

export function Background({ image }: { image: StaticImageData }) {
  return (
    <Image
      src={image}
      alt=""
      height={100}
      width={100}
      sizes="100vw"
      className="fixed top-0 -z-50 hidden w-full opacity-50 md:block"
    />
  );
}
