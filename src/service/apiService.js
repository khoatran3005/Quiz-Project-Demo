import { delay } from "lodash";
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
    return axios.post(`api/v1/login`, {
        email,
        password,
        delay:5000
    });
}

const postRegister = (email, password, username) =>{
    return axios.post(`api/v1/register`, {email, password, username});
}

const getQuizByUser = () =>{
    return axios.get(`api/v1/quiz-by-participant`);
}

const getDataQuiz = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
}

const postSubmitQuiz = (data) => {
    return axios.post(`api/v1/quiz-submit`, {...data});
}

const postCreateNewQuiz = (description, name, difficulty, image) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return axios.post('api/v1/quiz', data);
    
}

const getAllQuizForAdmin = () => {
    return axios.get('api/v1/quiz/all');
}

const deleteQuiz = (quiz) => {
    console.log('api',quiz)
    return axios.delete(`api/v1/quiz/${quiz.id}`);
}

const putUpdateQuiz = (id,description, name, difficulty, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return axios.put('api/v1/quiz', data);
}

const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) => {
    const data = new FormData();
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage', questionImage);
    return axios.post('api/v1/question', data);
}

const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) => {
    return axios.post('api/v1/answer', {
        description, correct_answer, question_id
    });
}

const postAssignQuiz = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user', {
        quizId, userId
    });
}

const getQuizWithQA = (quizId) =>{
    return axios.get(`api/v1/quiz-with-qa/${quizId}`)
}

const postUpsertQA = (data) => {
    return axios.post(`api/v1/quiz-upsert-qa`, {...data})
}

const logout = (email, refresh_token) => {
    return axios.post(`api/v1/logout`, {
        email, refresh_token
    })
}

export {
    postCreateNewUser, getAllUsers,
    postUpdateUser, deleteUser, getUserWithPaginate,
    postLogin, postRegister, getQuizByUser,getDataQuiz,
    postSubmitQuiz,postCreateNewQuiz,getAllQuizForAdmin,
    deleteQuiz,putUpdateQuiz, postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuestion, postAssignQuiz,getQuizWithQA,
    postUpsertQA, logout
}