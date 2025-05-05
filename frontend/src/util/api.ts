import { useLoading } from "@/context/LoadingContext";

const serialize = (obj: any, prefix?: string): string => {
    const str: Array<string> = [];
    for (const p in obj) {
        if (obj.hasOwnProperty(p)) {
            const key = prefix ? `${prefix}[${p}]` : p;
            const value = obj[p];
            if (value !== null && typeof value === "object") {
                str.push(serialize(value, key));
            } else {
                str.push(
                    `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
                );
            }
        }
    }
    return str.join("&");
};

const createRequest = (method: string, body: any) => {
    const request: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (body && ["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
        request.body = JSON.stringify(body);
    }

    return request;
};

function useApi() {
    const { setLoading } = useLoading();

    const baseUrl = "http://localhost:8000/";

    const apiCall = async (url: string, request: RequestInit): Promise<any> => {
        setLoading(true);

        try {
            const response = await fetch(`${baseUrl}${url}`, request);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "An error occurred");
            }

            return data;
        } catch (error) {
            console.error("API Error:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const get = async (url: string, queryParams?: any): Promise<any> => {
        if (queryParams) {
            url += `?${serialize(queryParams)}`;
        }
        return apiCall(url, createRequest("GET", null));
    };

    const post = async (url: string, body: any): Promise<any> => {
        return apiCall(url, createRequest("POST", body));
    };

    const put = async (url: string, body: any): Promise<any> => {
        return apiCall(url, createRequest("PUT", body));
    };

    const del = async (url: string, body: any): Promise<any> => {
        return apiCall(url, createRequest("DELETE", body));
    };

    return { get, post, put, del };
}

export default useApi;
