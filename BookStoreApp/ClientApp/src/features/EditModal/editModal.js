import "bootstrap/dist/css/bootstrap.min.css";
import { Button , Label, Col, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup, Form, Input
} from "reactstrap";
import React, {useState} from "react"
import {bookService} from "../../Services";

export default function EditModal(props) {
    const { showEditModal, setShowEditModal, data, setData, item , ...rest } = props;
    const [modal, setModal] = useState(false);
    const toggle = () => setShowEditModal(!showEditModal);
    

    const handleSubmit = (e) => {
        e.preventDefault()
        const bookName = e.target.bookName.value;
        const price = e.target.price.value;
        const description = e.target.description.value;
        const category = e.target.category.value;
        const id =  item.id
        const personArray = [{ bookName, price, description, category,id}]
        let newData = data.map(obj => personArray.find(o => o.id === obj.id) || obj);
        bookService.updateBook(personArray);
        setData(newData);
        setShowEditModal(false)
    }
    

    return (
        <Modal isOpen={showEditModal} toggle={toggle}>
            <Form onSubmit={handleSubmit}>
                <ModalHeader>
                    <div><h3>Edit</h3></div>
                </ModalHeader>
                <ModalBody>
                   
                    <FormGroup row className='mt-2'>
                        <Label sm={3}>Book Name</Label>
                        <Col sm={9}>
                            <input className="form-control"  type="text"
                                   name="bookName"
                                   placeholder="Harry Potter"
                                   defaultValue={item.bookName}
                                   required
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row className='mt-2'>
                        <Label sm={3}>Price</Label>
                        <Col sm={9}>
                            <input className="form-control"  type="text"
                                   required
                                   name="price"
                                   defaultValue={item.price}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row className='mt-2'>
                        <Label sm={3}>Description</Label>
                        <Col sm={9}>
                            <textarea className="form-control"
                                   required
                                   placeholder="book description here"
                                   name="description"
                                   defaultValue={item.description}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row className='mt-2'>
                        <Label  sm={3}>Select book category</Label>
                        <Col sm={9}>
                            <Input type="select"  name="category" defaultValue={item.category}>
                                <option>Fiction</option>
                                <option>Love</option>
                                <option>Technology</option>
                            </Input>
                        </Col>
                    </FormGroup>
                    

                </ModalBody>

                <ModalFooter>
                    <Button color="primary" type="submit">Save</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Form>
        </Modal>
    )
}