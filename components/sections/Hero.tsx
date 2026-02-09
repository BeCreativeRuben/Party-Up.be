import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen -mt-[104px] flex items-center justify-center overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
        <div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-2xl animate-hero-content">
            <span className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent animate-gradient">
              No Nonsense Feestverhuur
            </span>
          </h1>

          <p className="text-2xl sm:text-3xl mb-4 text-white/95 font-medium drop-shadow-lg animate-hero-content-delay-1">
            Organiseer je perfecte feest zonder gedoe
          </p>

          <p className="text-lg sm:text-xl mb-10 text-white/90 max-w-2xl mx-auto drop-shadow-md animate-hero-content-delay-2">
            Geen opslag, geen onderhoud, geen verrassingen. Gewoon betrouwbaar feestmateriaal dat je
            zelf ophaalt en terugbrengt. Perfect voor feesten met 10-100 gasten.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-hero-content-delay-4">
            <Link
              href="/booking"
              className="group relative px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl"
            >
              <span className="relative z-10">Reserveer Nu</span>
              <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              href="/catalog"
              className="group px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/50 text-white rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-blue-600 hover:border-white hover:scale-105 shadow-xl"
            >
              Bekijk Catalogus
            </Link>
          </div>
        </div>

        {/* Floating decorative elements - CSS only */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float" aria-hidden />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-float-alt" aria-hidden />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce" style={{ animationDelay: "0.2s" }} />
        </div>
      </div>
    </section>
  );
}
