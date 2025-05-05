import { createContext, useContext, useMemo, useState } from "react";

type LoadingProviderState = {
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
};

const initialState: LoadingProviderState = {
    isLoading: false,
    setLoading: () => null,
};

const LoadingContext = createContext<LoadingProviderState>(initialState);

export const LoadingProvider = (props: any) => {
    const [isLoading, setIsLoading] = useState(false);

    const value = useMemo(() => {
        return {
            isLoading,
            setLoading: (loading: boolean) => {
                setIsLoading(loading);
            },
        };
    }, []);

    return (
        <LoadingContext.Provider value={value}>
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black opacity-50 z-50">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                    >
                        <defs>
                            <filter id="svgSpinnersGooeyBalls10">
                                <feGaussianBlur
                                    in="SourceGraphic"
                                    result="y"
                                    stdDeviation="1.5"
                                />
                                <feColorMatrix
                                    in="y"
                                    result="z"
                                    values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"
                                />
                                <feBlend in="SourceGraphic" in2="z" />
                            </filter>
                        </defs>
                        <g
                            fill="currentColor"
                            filter="url(#svgSpinnersGooeyBalls10)"
                        >
                            <circle cx="4" cy="12" r="3">
                                <animate
                                    attributeName="cx"
                                    calcMode="spline"
                                    dur="0.75s"
                                    keySplines=".56,.52,.17,.98;.56,.52,.17,.98"
                                    repeatCount="indefinite"
                                    values="4;9;4"
                                />
                                <animate
                                    attributeName="r"
                                    calcMode="spline"
                                    dur="0.75s"
                                    keySplines=".56,.52,.17,.98;.56,.52,.17,.98"
                                    repeatCount="indefinite"
                                    values="3;8;3"
                                />
                            </circle>
                            <circle cx="15" cy="12" r="8">
                                <animate
                                    attributeName="cx"
                                    calcMode="spline"
                                    dur="0.75s"
                                    keySplines=".56,.52,.17,.98;.56,.52,.17,.98"
                                    repeatCount="indefinite"
                                    values="15;20;15"
                                />
                                <animate
                                    attributeName="r"
                                    calcMode="spline"
                                    dur="0.75s"
                                    keySplines=".56,.52,.17,.98;.56,.52,.17,.98"
                                    repeatCount="indefinite"
                                    values="8;3;8"
                                />
                            </circle>
                        </g>
                    </svg>
                </div>
            )}
            {props.children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
};
