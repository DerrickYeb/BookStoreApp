import "bootstrap/dist/css/bootstrap.min.css";
import {
    Button, Label, Col, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup, Form, Input
} from "reactstrap";
import React, {useState} from "react"
import axios from "axios";
import {useToasts} from "react-toast-notifications";

export default function AddModal(props) {
    const {showAddModal, setShowAddModal, data, setData, ...rest} = props;
    const [modal, setModal] = useState(false);
    const toggle = () => setShowAddModal(!showAddModal);
const {addToast} = useToasts();
    const handleSubmit = (e) => {
        e.preventDefault()
        const bookName = e.target.bookName.value;
        const price = e.target.price.value;
        const description = e.target.description.value;
        const category = e.target.category.value;
        setData([{bookName, price, description, category}, ...data]);

        const saveBook = {bookName, price, description, category};
        setShowAddModal(false);

        axios.post("https://localhost:7284/api/book/add/new/book", saveBook).then(
            r => r.data.isSuccessful == true ? addToast(r.data.message, {appearance: "success"}) : addToast(r.data.message, {appearance: "error"})
        ).catch(e => addToast(e))
    }


    return (
        <Modal isOpen={showAddModal} toggle={toggle}>
            <Form onSubmit={handleSubmit}>
                <ModalHeader>
                    <div><h3>Add New Book</h3></div>
                </ModalHeader>

                <ModalBody>
                    <FormGroup row className='mt-2'>
                        <Label sm={3}>Book Name</Label>
                        <Col sm={9}>
                            <input className="form-control" type="text"
                                   name="bookName"
                                   placeholder="Harry Potter"
                                   required
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row className='mt-2'>
                        <Label sm={3}>Book Price</Label>
                        <Col sm={9}>
                            <input className="form-control" type="number"
                                   required
                                   placeholder="2000"
                                   name="price"
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row className='mt-2'>
                        <Label sm={3}>Description</Label>
                        <Col sm={9}>
                            <textarea className="form-control"
                                      required
                                      placeholder="book description"
                                      name="description"
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row className='mt-2'>
                        <Label sm={3}>Category</Label>
                        <Col sm={9}>
                            <Input name="category" className="form-control" required/>
                            {/*<select  name="category">*/}
                            {/*    <option>Fiction</option>*/}
                            {/*    <option>Love</option>*/}
                            {/*    <option>Drama</option>*/}
                            {/*</select>*/}
                        </Col>
                    </FormGroup>

                </ModalBody>

                <ModalFooter>
                    <Button color="primary" type="submit">Insert</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Form>
        </Modal>
    )
}