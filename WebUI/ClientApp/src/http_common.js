import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:36235/",
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
    }
});