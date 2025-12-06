import axios from "axios";


// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});

// Alter defaults after instance has been created
// const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5IiwiZnVsbE5hbWUiOiJJJ20gQWRtaW5uIiwicm9sZSI6IkFETUlOIiwic3ViIjoiNjkyYjExYzczOWVhZDIwNWZhZGIxMWFlIiwiYXZhdGFyIjoiMjEyMzJmMjk3YTU3YTVhNzQzODk0YTBlNGE4MDFmYzMucG5nIiwiaWF0IjoxNzY0OTA1NzQxLCJleHAiOjE3NjQ5NDE3NDF9.cBBFCKsdEa4l1fkwuM-kgQbpWVEipk_5rPJInR9EbaE";
// instance.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (typeof window !== "undefined" && window && window.localStorage &&
        window.localStorage.getItem('access_token')) {
        config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token');
    }

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
}
);

// Add a response interceptor
instance.interceptors.response.use(function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data && response.data.data) {
        return response.data;
    }

    return response;
}, function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (error.response && error.response.data) {
        return error.response.data;
    }
    return Promise.reject(error);
});



export default instance;