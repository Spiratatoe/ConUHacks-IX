export function Card({ title, description, children }: {
    title: string,
    description?: string,
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
            <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl bg-white">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 px-4 py-6 pt-8 text-center sm:px-16">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    {description && <p className="text-sm text-gray-500">{description}</p>}
                </div>
                <div className="px-4 py-8 sm:px-16 bg-gray-50">
                    {children}
                </div>
            </div>
        </div>
    );
}