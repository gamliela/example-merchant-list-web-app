import * as base64 from "base-64";

export function fetchContent(url: RequestInfo, options?: RequestInit): Promise<Response> {
    options = {
        ...options,
        credentials: 'include'
    };
    if (window.fetch)
        return window.fetch(url, options).then(response => {
            if (response.ok)
                return response;
            else
                throw new Error(response.statusText);
        });
    else
        return Promise.reject(new Error("fetch is not supported"));
}

export function getJson(url: RequestInfo, options?: RequestInit) {
    return fetchContent(url, options).then(content => content.json());
}

// will simulate a server call with mock data
export function getMockJson(mockdata: any, fail: boolean = false, timeout: number = 1500): Promise<any> {
    return new Promise((resolve, reject) => {
        const func = (fail ? reject : resolve);
        setTimeout(() => func(mockdata), timeout);
    });
}

export function configureBasicAuth(user: string, password: string, options?: RequestInit): RequestInit {
    let {headers, ...nonHeaders} = (options || {headers: undefined});
    headers = headers || new Headers();
    headers.append('Authorization', 'Basic ' + base64.encode(user + ":" + password));
    return {
        ...nonHeaders,
        headers
    }
}
