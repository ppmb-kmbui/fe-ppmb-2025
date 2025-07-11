import Image from "next/image";

export function TopBar() {
  return (
    <nav className="w-full h-fit p-2 justify-start bg-yellow-200">
      {/* Image container to adjust image size */}
      <div id="image-container" className="relative size-12">
        <Image src="/logo.svg" alt="PPMB Logo" fill={true} />
      </div>
    </nav>
  );
}
