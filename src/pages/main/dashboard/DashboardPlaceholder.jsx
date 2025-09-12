export default function DashboardPlaceholder() {
    return (
        <div className="min-h-screen max-w-4xl bg-gray-100 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left section */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Top wide card */}
                    <div className="h-24 bg-gray-200 rounded-xl"></div>

                    {/* Grid of smaller cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="h-24 bg-gray-200 rounded-xl"></div>
                        <div className="h-24 bg-gray-200 rounded-xl"></div>
                        <div className="h-24 bg-gray-200 rounded-xl"></div>
                        <div className="h-24 bg-gray-200 rounded-xl"></div>
                        <div className="h-24 bg-gray-200 rounded-xl"></div>
                        <div className="h-24 bg-gray-200 rounded-xl"></div>
                        <div className="h-24 bg-gray-200 rounded-xl"></div>
                        <div className="h-24 bg-gray-200 rounded-xl"></div>
                        <div className="h-24 bg-gray-200 rounded-xl"></div>

                    </div>
                </div>

                {/* Right section (stacked list) */}
                <div className="space-y-4">
                    <div className="h-6 bg-gray-200 rounded-full"></div>
                    <div className="h-6 bg-gray-200 rounded-full"></div>
                    <div className="h-6 bg-gray-200 rounded-full"></div>
                    <div className="h-6 bg-gray-200 rounded-full"></div>
                    <div className="h-6 bg-gray-200 rounded-full"></div>
                    <div className="h-6 bg-gray-200 rounded-full"></div>
                    <div className="h-6 bg-gray-200 rounded-full"></div>
                    <div className="h-6 bg-gray-200 rounded-full"></div>
                    <div className="h-6 bg-gray-200 rounded-full"></div>
                    <div className="h-6 bg-gray-200 rounded-full"></div>
                    <div className="h-6 bg-gray-200 rounded-full"></div>
                    <div className="h-6 bg-gray-200 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}
