import axios from "../utils/axiosCustomize";

const postCreateNewUser = (email, password, username, role, userImage) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', userImage);
    return axios.post('api/v1/participant', data);
}

const getAllUsers = () => {
    return axios.get('api/v1/participant/all');
}

const postUpdateUser = (id, username, role, userImage) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', userImage);
    return axios.put('api/v1/participant', data);
}

const deleteUser = (user) => {
    return axios.delete('api/v1/participant', { data: { id: user.id } });
}

const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const postLogin = (email,password) =>{
    return axios.post(`api/v1/login`, {email, password});
}

const postRegister = (email, password, username) =>{
    return axios.post(`api/v1/register`, {email, password, username});
}

export {
    postCreateNewUser, getAllUsers,
    postUpdateUser, deleteUser, getUserWithPaginate,
    postLogin, postRegister
}