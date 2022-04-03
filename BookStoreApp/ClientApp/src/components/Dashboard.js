import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Container, Input, Table} from "reactstrap";
import React, {useEffect, useState} from "react"

import AddModal from '../features/AddModal';
import EditModal from '../features/EditModal';
import {bookService} from '../Services'
//import Footer from './components/Footer';
import axios from 'axios';

import {BsFillPencilFill, BsTrash} from "react-icons/bs";
import {useToasts} from "react-toast-notifications";
import {authHeader} from "../_helpers";
import * as nodes from "rxjs";

const URL = "https://jsonplaceholder.typicode.com/users"

function Dashboard() {
    const initialState = [
        {id: 1, name: "maria", lastname: "Falcon", email: "a@gmail.com", admin: true, language: "ES"},
        {id: 2, name: "Yoel", lastname: "Herrera", email: "b@gmail.com", admin: false, language: "EN"}
    ]
const addToast = useToasts()
    const getAllBooks = (bookId) => {
        bookService.searchBook(bookId).then(r => {
            const newData = [];
            const responseData = r.data;
            console.log(responseData)
            responseData.map(item => {
            newData.push({
                id: item.id,
                bookName : item.bookName,
                price:item.price,
                category:item.category,
                description:item.description
            },
            )
            })
            console.log(newData);
            setData(newData);
        });
    }
    const [data, setData] = useState(initialState)
    // const dataAll = getAllBooks();
    // const [data, setData] = useState(dataAll);
    
    //Search State
    const [search,setSearch] = useState('');
    
    const handleSearch = (e) =>{
        setSearch(e.target.value)
    }

    // Modal
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
            return axios.get("https://localhost:7284/api/book", {header: {"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImRlcnJ5IiwibmJmIjoxNjQ4OTIyOTY5LCJleHAiOjE2NDkwMDkzNjksImlhdCI6MTY0ODkyMjk2OX0.yLwnIeSooZk-qxP9VsH77sds80o_d43qi4MCS_CE58M"},}).then(resp => {
                const nuewData = []
                const dataAxios = resp.data
                dataAxios.map(item => {
                    nuewData.push(
                        {
                            id: item.id,
                            bookName: item.bookName,
                            price: item.price,
                            category: item.category,
                            description: item.description
                        },
                    )
                })
                nodes.filter((ite =>{
                    ite.name.toLowerCase().includes(search.toLowerCase())
                }))
                setData(nuewData)
            });
        }
    )
    
    
    const [item, setItem] = useState({})
    const searchBookById = (e) => {
        bookService.searchBook(e.target["bookName"].value).then(r => {
            const newData = [];
            const responseData = r.data;
            console.log(responseData)
            responseData.map(item => {
                newData.push({
                        id: item.id,
                        bookName : item.bookName,
                        price:item.price,
                        category:item.category,
                        description:item.description
                    },
                )
            })
            console.log(newData);
            setData(newData);
        });
    }
    const insertFn = () => {
        setShowAddModal(true);
    }

    const editFn = (item) => {
        setShowEditModal(true);
        setItem(item);
    }

    const deleteFn = (id) => {
        let option = window.confirm("Are you sure you want to delete" + id);
        if (option === true) {
            const newData = data.filter(e => e.id !== id);
            bookService.deleteBook(id);
            setData(newData)
        }
    }

    const restartFn = () => {
        setData(initialState);
    }

    const loadAxios = () => {
        axios.get("https://localhost:7284/api/book",{header:{"Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImRlcnJ5IiwibmJmIjoxNjQ4OTIyOTY5LCJleHAiOjE2NDkwMDkzNjksImlhdCI6MTY0ODkyMjk2OX0.yLwnIeSooZk-qxP9VsH77sds80o_d43qi4MCS_CE58M"},}).then(resp => {
            const nuewData = []
            const dataAxios = resp.data
            console.log(dataAxios)
            dataAxios.map(item => {
                nuewData.push(
                    {
                        id: item.id,
                        bookName: item.bookName,
                        price: item.price,
                        category: item.category,
                        description: item.description
                    },
                )
            })
            setData(nuewData)
        });
    }
    
    return (
        <>
            <Container>
                <br/>
                <Button color="success" onClick={() => insertFn()} className='m-2'>Insert New Book</Button>
                <input id="search" onChange={handleSearch} type="text" className="form-control"/>
                <Button onClick={() => loadAxios()} className='m-2'>Search</Button>
                <Button onClick={() => searchBookById()} className='m-2'>Search By</Button>
                <br/>
                <Table responsive>
                    <thead>
                    <tr>
                        <th hidden>id</th>
                        <th>Book Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td hidden>{item.id}</td>
                            <td>{item.bookName}</td>
                            <td>{item.price}</td>
                            <td>{item.category}</td>
                            <td>{item.description}</td>
                            <td>
                                <Button color="warning" onClick={() => editFn(item)}><BsFillPencilFill/></Button>{" "}
                                <Button color="danger" onClick={() => deleteFn(item.id)}><BsTrash/></Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Container>

            <AddModal showAddModal={showAddModal} setShowAddModal={setShowAddModal} setData={setData} data={data}/>
            <EditModal showEditModal={showEditModal} setShowEditModal={setShowEditModal} setData={setData} data={data}
                       item={item}/>

        </>
    );
}

export default Dashboard;