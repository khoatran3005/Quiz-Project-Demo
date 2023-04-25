import { useState } from 'react';
import Select from 'react-select';
import './Question.scss'
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";


const Questions = () => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const [selectedQuiz, setSelectedQuiz] = useState('');
    return (
        <div className="question-container">
            <div className="title">
                Manage Question
            </div>
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label>Select Quiz</label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    />
                </div>

                <div className='mt-3'>
                    Add question:
                </div>
                <div>
                    <div className='question-content'>
                        <div className="form-floating description">
                            <input type="text" className="form-control" placeholder="name@example.com" />
                            <label >Decription</label>
                        </div>
                        <div className='group-upload'>
                            <label className='lable-up'>Upload Image</label>
                            <input type={'file'} hidden />
                            <span>0 file is uploaded</span>
                        </div>
                        <div className='btn-add'>
                            <span>
                                <BiPlusCircle className='icon-add' />
                            </span>
                            <span>
                                <BiMinusCircle className='icon-remove' />
                            </span>
                        </div>
                    </div>

                    <div className='answers-content'>
                        <input
                            className="form-check-input iscorrect"
                            type="checkbox" />

                        <div className="form-floating answer-name">
                            <input type="text" className="form-control" placeholder="name@example.com" />
                            <label >Answers 1</label>
                        </div>
                        <div className='btn-group'>
                            <span>
                                <FiPlusCircle className='icon-add' />
                            </span>
                            <span>
                                <FiMinusCircle className='icon-remove' />
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Questions;