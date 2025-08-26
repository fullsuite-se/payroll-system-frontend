import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = "error") => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type, visible: true }]);

        // Auto-hide after 3s with fade-out
        setTimeout(() => {
            setToasts((prev) =>
                prev.map((t) => (t.id === id ? { ...t, visible: false } : t))
            );
        }, 2500);

        // Remove from DOM after fade-out ends
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    const getToastStyle = (type) => {
        switch (type) {
            case "error":
                return "bg-red-500/90 text-white";
            case "warning":
                return "bg-orange-500/90 text-white";
            case "success":
                return "bg-green-500/90 text-white";
            default:
                return "bg-gray-500/90 text-white";
        };
    }

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}

            {/* Toast Container */}
            <div className="fixed top-4 right-4 space-y-2 z-50">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`px-4 py-2 rounded-2xl shadow-lg text-sm font-medium 
                            transition-all duration-500 ease-in-out
                        ${toast.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
                        ${getToastStyle(toast.type)}
                        `}
                    >
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToastContext = () => useContext(ToastContext);
