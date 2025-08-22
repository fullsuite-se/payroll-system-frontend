import LoginForm from "./LoginForm";
import KriyaLogo from "../../assets/kriya-logo.png";

const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                {/* Logo + Title */}
                <div className="flex flex-col items-center mb-8">
                    <img src={KriyaLogo} alt="Kriya Logo" className="h-12 w-12 mb-3" />
                    <h1 className="text-xl font-semibold text-gray-900">Kriya HR’s Payroll</h1>
                </div>

                {/* Welcome text */}
                <div className="text-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Welcome!</h2>
                    <p className="text-sm text-gray-600">Enter your email and password to continue</p>
                </div>

                {/* Form */}
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
