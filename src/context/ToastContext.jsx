import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'success') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto remove after 3 seconds
        setTimeout(() => {
            removeToast(id);
        }, 3000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed top-24 right-6 z-[60] flex flex-col gap-3 pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`
              pointer-events-auto min-w-[300px] bg-white shadow-xl border-l-4 p-4 rounded-sm transform transition-all duration-500 animate-slide-in-right
              ${toast.type === 'success' ? 'border-green-500' : 'border-red-500'}
            `}
                    >
                        <div className="flex items-center gap-3">
                            {toast.type === 'success' ? (
                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">✓</div>
                            ) : (
                                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xs">!</div>
                            )}
                            <p className="text-sm font-medium text-gray-800">{toast.message}</p>
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="ml-auto text-gray-400 hover:text-black"
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
