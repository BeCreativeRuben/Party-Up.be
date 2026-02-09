import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

const FeaturedProducts = dynamic(() => import("@/components/sections/FeaturedProducts"), {
  loading: () => (
    <section className="pt-28 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-48 mx-auto mb-4" />
          <div className="h-5 bg-gray-200 rounded w-64 mx-auto mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-100 rounded-lg overflow-hidden">
                <div className="aspect-square bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-10 bg-gray-200 rounded mt-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  ),
});

const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), {
  loading: () => (
    <section className="pt-28 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-4" />
          <div className="h-5 bg-gray-200 rounded w-48 mx-auto mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 rounded-lg p-8 h-64" />
            ))}
          </div>
        </div>
      </div>
    </section>
  ),
});

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <Testimonials />
    </div>
  );
}

