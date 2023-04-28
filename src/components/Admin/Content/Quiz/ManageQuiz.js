import './ManageQuiz.scss';
import Select from 'react-select';
import { useState } from 'react';
import { postCreateNewQuiz } from '../../../../service/apiService'
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import ModalEditQuiz from './ModalEditQuiz';
import ModalDeleteQuiz from './ModalDeleteQuiz';
import { getAllQuizForAdmin } from "../../../../service/apiService"
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';


const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];

const ManageQuiz = (props) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('EASY');
    const [image, setImage] = useState('');

    const [listQuiz, setListQuiz] = useState([])

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [dataQuizUpdate, setDataQuizUpdate] = useState({});
    const [dataQuizDelete, setDataQuizDelete] = useState({});

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }

    const handleClickEditQuiz = (quiz) => {
        setShowEditModal(true);
        setDataQuizUpdate(quiz);
    }

    const handleClickDeleteQuiz = (quiz) => {
        setShowDeleteModal(true);
        setDataQuizDelete(quiz);
    }

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }
    }

    const resetUpdateQuiz = () => {
        dataQuizUpdate({});
    }

    const handleSubmitQuiz = async () => {
        if (!name || !description) {
            toast.error('Name/Description is required')
            return;
        }

        let res = await postCreateNewQuiz(description, name, type?.value, image);
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setName('');
            setDescription('');
            setImage(null);
            await fetchQuiz();
        } else {
            toast.error(res.EM)
        }
    }
    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>ManageQuiz</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">Add new quiz:</legend>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='your-quiz-name'
                                        value={name}
                                        onChange={(event) => setName(event.target.value)} />
                                    <label htmlFor="floatingInput">Name</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='description'
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)} />
                                    <label htmlFor="floatingPassword">Description</label>
                                </div>
                                <div className='my-3'>
                                    <Select
                                        defaultValue={type}
                                        onChange={setType}
                                        // onChange={this.handleChange}
                                        options={options}
                                        placeholder={'Quiz type ...'}
                                    />
                                </div>
                                <div className='more-actions form-group'>
                                    <label className='mb-1'>Upload Image</label>
                                    <input
                                        type='file'
                                        className='form-control'
                                        onChange={(event) => handleChangeFile(event)} />
                                </div>
                                <div className='mt-3'>
                                    <button
                                        className='btn btn-warning '
                                        onClick={() => handleSubmitQuiz()}>Save</button>
                                </div>
                            </fieldset>
                        </div>
                        <div className="list-detail">
                            <TableQuiz
                                listQuiz={listQuiz}
                                fetchQuiz={fetchQuiz}
                                handleClickEditQuiz={handleClickEditQuiz}
                                handleClickDeleteQuiz={handleClickDeleteQuiz} />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Update Q/A Quiz</Accordion.Header>
                    <Accordion.Body>
                        <QuizQA/>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Assign to users</Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz/>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>


            <ModalEditQuiz
                dataQuizUpdate={dataQuizUpdate}
                show={showEditModal}
                setShow={setShowEditModal}
                fetchQuiz={fetchQuiz}
                resetUpdateQuiz={resetUpdateQuiz}></ModalEditQuiz>
            <ModalDeleteQuiz
                dataQuizDelete={dataQuizDelete}
                show={showDeleteModal}
                setShow={setShowDeleteModal}
                fetchQuiz={fetchQuiz}>

            </ModalDeleteQuiz>
        </div>
    )
}

export default ManageQuiz;