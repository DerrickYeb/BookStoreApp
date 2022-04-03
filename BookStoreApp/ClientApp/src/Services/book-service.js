import config from '../_helpers/config';
import {authHeader, handleResponse} from '../_helpers';
import axios from "axios";
import {useToasts} from "react-toast-notifications";

const url = "https://localhost:7284/api/book/"
export const bookService = {
    getAll,
    addNewBook,
    updateBook,
    deleteBook,
    searchBook,
    getAllBooks
};

const data = {bookName: "", price: 0, description: "", category: ""};

function getAll() {
    const requestOptions = {method: 'GET', headers: authHeader()};
    return fetch(`${url}book`, requestOptions).then(handleResponse);

}
function getAllBooks(){
    return axios.get(`${url}Book`,{headers:authHeader() })
}

function addNewBook(data) {
    const postOptions = {method: "POST", headers: authHeader(), data};
    return fetch("add/new/", postOptions);
}

function updateBook(data) {
    axios.put(`${url}update/book/`,
        data, {
            headers: authHeader()
            
        }).then(r => r.data).catch(e => e.message)
}

function searchBook(bookName) {
    axios.get(`search/book/by/${bookName}`,{headers:authHeader()}).then(r => r.data)
        .catch(e => e.message);
}

function deleteBook(bookId) {
    axios.delete(`${url}delete/by/${bookId}`,
        {headers:authHeader()})
        .then(r => r.data.message
           // r.data.isSuccessful == true ? addToast(r.data.message,{appearance:"success"}):addToast(r.data.message,{appearance:"error"}))
        .catch(e => e.message))

}