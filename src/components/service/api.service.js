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

const UpdateUserAPI = (id, fullName, phoneNumber, avatar) => {
    const BACKEND_URL = "/api/v1/user";
    const data = {
        _id: id,
        fullName: fullName,
        phone: phoneNumber,
        avatar: avatar
    }

    return axios.put(BACKEND_URL, data);
}

const DeleteUserAPI = (id) => {
    const BACKEND_URL = "/api/v1/user/" + id;

    return axios.delete(BACKEND_URL);
}

const UploadFileAPI = (file, folder) => {
    const BACKEND_URL = `/api/v1/file/upload`;

    let config = {
        headers: {
            "upload-type": folder,
            "Content-Type": 'multipart/form-data'
        }
    }
    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", file);

    return axios.post(BACKEND_URL, bodyFormData, config);
}

const FetchAllUserAPI = (current, pageSize) => {
    const BACKEND_URL = `/api/v1/user?current=${current}&pageSize=${pageSize}`;

    return axios.get(BACKEND_URL);
}

const RegisterUserAPI = (fullName, email, password, phone) => {
    const BACKEND_URL = "/api/v1/user/register";

    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    }

    return axios.post(BACKEND_URL, data);
}

export { CreateUserAPI, FetchAllUserAPI, UpdateUserAPI, DeleteUserAPI, UploadFileAPI, RegisterUserAPI };