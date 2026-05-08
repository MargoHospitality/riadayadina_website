import Image from "next/image"

export function RoomsHero() {
  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/ayadina/rooms-hero-adelina-chambre-04.jpg"
          alt="Chambre Adelina du Riad Ayadina"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          style={{ objectPosition: "50% 48%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <p className="text-white/80 text-sm uppercase tracking-[0.3em] mb-4">
          Nos hébergements
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 text-balance">
          Chambres & Suites
        </h1>
        <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto text-pretty">
          Neuf chambres uniques, chacune portant un nom commençant par A, 
          signature d&apos;Ayadina. Des espaces où l&apos;artisanat marocain 
          rencontre le confort contemporain.
        </p>
      </div>
    </section>
  )
}
