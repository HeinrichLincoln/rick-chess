import axios from "axios";

const apiService = axios.create({
    baseURL: "http://localhost:12000"
})

export default apiService