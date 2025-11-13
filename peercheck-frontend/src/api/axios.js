import axios from "axios";

const api = asxios.create({
    baseURL: "http://localhost:4000/api",
});

//Auto attach token on each request
api.interceptors.request.use((config)=> {
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default api;