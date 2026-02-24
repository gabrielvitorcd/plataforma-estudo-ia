export default function Loading() {
    return (
        <div className="container mx-auto p-6">
            {/* Skeleton do título */}
            <div className="mb-8">
                <div className="h-9 w-64 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-5 w-40 bg-gray-100 rounded animate-pulse" />
            </div>

            {/* Skeleton dos cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                        key={i}
                        className="border border-gray-200 rounded-lg p-6 bg-white"
                    >
                        {/* Título */}
                        <div className="h-6 bg-gray-200 rounded animate-pulse mb-4" />

                        {/* Badges */}
                        <div className="flex gap-2 mb-4">
                            <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse" />
                            <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse" />
                        </div>

                        {/* Botões */}
                        <div className="flex gap-3">
                            <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse" />
                            <div className="h-10 w-10 bg-gray-100 rounded-lg animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}