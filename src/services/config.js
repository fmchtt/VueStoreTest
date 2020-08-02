import axios from "axios";

export const http = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'x-access-token': localStorage.getItem('X-Acess-Token')
    }
})