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

export { CreateUserAPI };