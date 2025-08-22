import KriyaLogo from "../../assets/kriya-logo.png";
import PayrollIllustration from "../../assets/payroll-graphic.svg";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Navbar */}
            <header className="w-full px-8 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <img src={KriyaLogo} alt="Kriya Logo" className="h-12 w-12" />
                    <span className="text-xl font-semibold text-gray-900">Kriya</span>
                </div>
                <Link
                    to="/auth/login"
                    className="px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition"
                >
                    Login
                </Link>
            </header>

            {/* Hero Section */}
            <main className="flex-1 flex flex-col lg:flex-row items-center justify-between px-8 lg:px-20 py-16 gap-12">
                {/* Left Section */}
                <div className="max-w-xl">
                    <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                        Modern <span className="text-teal-600">Payroll System</span>
                    </h1>
                    <p className="mt-6 text-lg font-light text-gray-600">
                        Kriya manages <strong>regular</strong>, <strong>special</strong>, and{" "}
                        <strong>final pay runs</strong> for employees of Fullsuite, while supporting
                        multiple organizations with a <em>multi-tenant architecture</em>.
                    </p>
                    <p className="mt-4 text-lg font-extralight text-gray-600">
                        It also generates data for{" "}
                        <strong>BIR Form 2314</strong>, ensuring compliance with reporting requirements.
                    </p>

                    <div className="mt-8 flex gap-4">
                        <Link
                            to="/auth/login"
                            className="px-6 py-3 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 transition"
                        >
                            Get Started
                        </Link>
                        <a
                            href="#learn-more"
                            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
                        >
                            Learn More
                        </a>
                    </div>
                </div>

                {/* Right Section - Illustration */}
                <div className="flex-1 flex justify-center">
                    <img src={PayrollIllustration} className="hidden lg:flex w-96 h-96 rounded-xl items-center justify-center text-gray-500" />
                </div>
            </main>
        </div>
    );
};

export default HomePage;
