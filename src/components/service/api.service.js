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

const LoginApi = (userName, password) => {
    const BACKEND_URL = "/api/v1/auth/login";

    const data = {
        username: userName,
        password: password,
        deplay: 4000
    }

    return axios.post(BACKEND_URL, data);
}

const GetUserInfo = () => {
    const BACKEND_URL = "/api/v1/auth/account";

    return axios.get(BACKEND_URL);
}

const LogoutAPI = () => {
    const BACKEND_URL = "/api/v1/auth/logout";

    return axios.post(BACKEND_URL);
}


const FetchAllBookAPI = (current, pageSize) => {
    const BACKEND_URL = `/api/v1/book?current=${current}&pageSize=${pageSize}`;

    return axios.get(BACKEND_URL);
}

const CreateBookAPI = (name, price, quantity, author, category, thumbnail) => {
    const BACKEND_URL = "/api/v1/book";
    const data = {
        "slider": [],
        mainText: name,
        price: price,
        quantity: quantity,
        author: author,
        category: category,
        thumbnail: thumbnail,
        "sold": 1
    }

    return axios.post(BACKEND_URL, data);
}

export {
    CreateUserAPI, FetchAllUserAPI,
    UpdateUserAPI, DeleteUserAPI,
    UploadFileAPI, RegisterUserAPI,
    LoginApi, GetUserInfo, LogoutAPI,
    FetchAllBookAPI, CreateBookAPI
};