import axios from "./axios.custom.js"


const CreateUserAPI = (fullName, email, password, phoneNumber) => {
    const BACKEND_URL = "/api/v1/user";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phoneNumber
    }

    return axios.post(BACKEND_URL, data);
}

const UpdateUserAPI = (id, fullName, phoneNumber) => {
    const BACKEND_URL = "/api/v1/user";
    const data = {
        _id: id,
        fullName: fullName,
        phone: phoneNumber
    }

    return axios.put(BACKEND_URL, data);
}

const DeleteUserAPI = (id) => {
    const BACKEND_URL = "/api/v1/user/" + id;

    return axios.delete(BACKEND_URL);
}

const FetchAllUserAPI = () => {
    const BACKEND_URL = "/api/v1/user";

    return axios.get(BACKEND_URL);
}

export { CreateUserAPI, FetchAllUserAPI, UpdateUserAPI, DeleteUserAPI };