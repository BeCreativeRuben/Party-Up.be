export default function CatalogLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-48 mx-auto mb-4" />
        <div className="h-5 bg-gray-200 rounded w-96 mx-auto mb-10" />
        <div className="flex gap-3 justify-center mb-10">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 w-24 bg-gray-200 rounded-full" />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-gray-100 rounded-lg overflow-hidden">
              <div className="aspect-square bg-gray-200" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-10 bg-gray-200 rounded mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
