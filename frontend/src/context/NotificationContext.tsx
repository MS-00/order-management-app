import React, { createContext, useContext, useState, useMemo } from "react";

type NotificationType = "success" | "error" | "info";

type NotificationContextType = {
    showNotification: (message: string, type?: NotificationType) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
    undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState<NotificationType>("success");

    const showNotification = (
        msg: string,
        notificationType: NotificationType = "success"
    ) => {
        setMessage(msg);
        setType(notificationType);
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), 3000); // Auto-hide after 3 seconds
    };

    const contextValue = useMemo(() => ({ showNotification }), []);

    return (
        <NotificationContext.Provider value={contextValue}>
            {children}
            {isVisible && (
                <div
                    role="alert"
                    className={`fixed top-16 left-1/2 transform -translate-x-1/2 p-4 mb-4 text-sm rounded-lg shadow-lg z-50 ${
                        type === "success"
                            ? "text-green-800 bg-green-50 border border-green-300"
                            : type === "error"
                            ? "text-red-800 bg-red-50 border border-red-300"
                            : "text-blue-800 bg-blue-50 border border-blue-300"
                    }`}
                >
                    <svg
                        className="shrink-0 inline w-5 h-5 mr-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2h-1v3h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="font-medium">{message}</span>
                </div>
            )}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error(
            "useNotification must be used within a NotificationProvider"
        );
    }
    return context;
};
