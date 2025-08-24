import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center">
        <Image
          
          src="/capovape-logo.jpg"
          alt="Capovape logo"
          width={200}
          height={42}
          priority
        />
        
        <Image
          
          src="/coming-soon.webp"
          alt="coming soon.."
          width={140}
          height={52}
          priority
        />

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border  border-solid border-transparent transition-colors flex items-center justify-center bg-yellow-400 text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-semibold text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://www.instagram.com/capovape.ca"
            target="_blank"
            rel="noopener noreferrer"
          >
           
            Follow us @capovape.ca  →
          </a>
          
        </div>
      </main>
    </div>
  );
}
