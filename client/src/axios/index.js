import axios from "axios";
import {httpServer} from "../const";

const api = axios.create({
    baseURL: httpServer,
});


export default api;
