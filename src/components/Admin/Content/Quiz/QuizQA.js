import { useEffect, useState } from 'react';
import Select from 'react-select';
import './QuizQA.scss'
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _ from "lodash"
import Lightbox from "react-awesome-lightbox";
import {
    getAllQuizForAdmin, postCreateNewAnswerForQuestion,
    postCreateNewQuestionForQuiz, getQuizWithQA, postUpsertQA
} from "../../../../service/apiService"
import { toast } from 'react-toastify';
import { useTranslation, Trans } from 'react-i18next';

const QuizQA = (props) => {

    const initQuestions = [
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
                }
            ]
        }
    ]
    const { t } = useTranslation();
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState('');
    const [questions, setQuestions] = useState(initQuestions);
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: ''
    })
    const [listQuiz, setListQuiz] = useState([]);

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setListQuiz(newQuiz)
        }
    }

    useEffect(() => {
        fetchQuiz();
    }, []);

    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value) {
            fetchQuizWithQA();
        }
    }, [selectedQuiz]);

    //return a promise that resolves with a File instance
    function urltoFile(url, filename, mimeType) {
        return (fetch(url)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
        );
    }

    const fetchQuizWithQA = async () => {
        let res = await getQuizWithQA(selectedQuiz.value);
        if (res && res.EC === 0) {
            //convert
            let newQA = [];
            for (let i = 0; i < res.DT.qa.length; i++){
                let q = res.DT.qa[i];
                if(q.imageFile) {
                    q.imageName = `Question-${q.id}.png`;
                    q.imageFile =  await urltoFile(`data:image/pns;base64,${q.imageFile}`, `Question-${q.id}.png`,`image/png`)               
                }
                newQA.push(q);
            }
            setQuestions(newQA);
            console.log('check QA', newQA);
        }

    }

    const handleAddRemoveQuestion = (type, id) => {
        console.log('check', type, id)
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    },
                ]
            }
            setQuestions([...questions, newQuestion])
        } else if (type === 'REMOVE') {
            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter(item => item.id !== id);
            setQuestions(questionsClone);
        }
    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions)
        // console.log('check', type, id)
        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }

            let index = questionsClone.findIndex(item => item.id === questionId)
            questionsClone[index].answers.push(newAnswer);
            setQuestions(questionsClone)
        }

        else if (type === 'REMOVE') {
            let index = questionsClone.findIndex(item => item.id === questionId)
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId);
            setQuestions(questionsClone);
        }
    }

    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionsClone = _.cloneDeep(questions);
            let index = questionsClone.findIndex(item => item.id === questionId);
            if (index > -1) {
                questionsClone[index].description = value;
                setQuestions(questionsClone);
            }

        }
    }

    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0];
            console.log('check file', event.target.files[0])
            questionsClone[index].imageName = event.target.files[0].name;
            setQuestions(questionsClone);
        }
    }

    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            questionsClone[index].answers =
                questionsClone[index].answers.map(answer => {
                    if (answer.id === answerId) {
                        if (type === 'CHECKBOX') {
                            answer.isCorrect = value;
                        }
                        if (type === 'INPUT') {
                            answer.description = value;
                        }

                    }
                    return answer;
                })
            setQuestions(questionsClone);
        }
    }

    const handlePreviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            setDataImagePreview({
                url: URL.createObjectURL(questionsClone[index].imageFile),
                title: questionsClone[index].imageName
            })
            setIsPreviewImage(true);
        }
    }

    const handleSubmitQuestionForQuiz = async () => {
        //todo
        if (_.isEmpty(selectedQuiz)) {
            toast.error("Please choose a Quiz")
            return;
        }
        let isValidAnswer = true;
        let indexQ = 0, indexA = 0;
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidAnswer = false;
                    indexA = j;
                    break;
                }
            }
            indexQ = i;
            if (isValidAnswer === false) {
                break;
            }
        }

        if (isValidAnswer === false) {
            toast.error(`Not empty answer ${indexA + 1} at Question ${indexQ + 1}`)
            return;
        }

        let isValidQuestion = true;
        let indexQ1 = 0;
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQuestion = false;
                indexQ1 = i;
                break;
            }
        }

        if (isValidQuestion === false) {
            toast.error(`Not empty description for Question ${indexQ1 + 1}`)
            return;
        }

        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });

        let questionClone = _.cloneDeep(questions);
        console.log('questionClone',questionClone);
        for (let i = 0; i < questionClone.length; i++) {
            if(questionClone[i].imageFile) {
                questionClone[i].imageFile = await toBase64(questionClone[i].imageFile)
            }
        }
        let res = await postUpsertQA({
            quizId: selectedQuiz.value,
            questions: questionClone,
        });

        if (res && res.EC === 0) {
            toast.success('Create questions and answers succed!');
            fetchQuizWithQA();
        }
        
    }
    
    return (
        <div className="question-container">
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label className='mb-2'> {t('question.select')}</label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>

                <div className='mt-3 mb-2'>
                {t('question.add')}:
                </div>

                {
                    questions && questions.length > 0
                    && questions.map((question, index) => {
                        return (
                            <div key={question.id} className='q-main mb-4'>
                                <div className='question-content'>
                                    <div className="form-floating description">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="name@example.com"
                                            value={question.description}
                                            onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)} />
                                        <label >{t('question.q')} {index + 1} {t('question.des')}</label>
                                    </div>
                                    <div className='group-upload'>
                                        <label htmlFor={`${question.id}`}>
                                            <RiImageAddFill className='lable-up' />
                                        </label>
                                        <input
                                            id={`${question.id}`}
                                            onChange={(event) => handleOnChangeFileQuestion(question.id, event)}
                                            type={'file'}
                                            hidden />
                                        <span>{question.imageName ?
                                            <span onClick={() => handlePreviewImage(question.id)} >{question.imageName}</span>
                                            :
                                            `${t('question.no-up')}`
                                        }</span>
                                    </div>
                                    <div className='btn-add'>
                                        <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                            <BiPlusCircle className='icon-add' />
                                        </span>
                                        {questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                                <BiMinusCircle className='icon-remove' />
                                            </span>
                                        }
                                    </div>
                                </div>
                                {question.answers && question.answers.length > 0
                                    && question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className='answers-content'>
                                                <input
                                                    className="form-check-input iscorrect"
                                                    type="checkbox"
                                                    checked={answer.isCorrect}
                                                    onChange={(event) => handleAnswerQuestion('CHECKBOX', answer.id, question.id, event.target.checked)} />
                                                <div className="form-floating answer-name">
                                                    <input
                                                        value={answer.description}
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="name@example.com"
                                                        onChange={(event) => handleAnswerQuestion('INPUT', answer.id, question.id, event.target.value)}
                                                    />
                                                    <label >{t('question.answer')} {index + 1}</label>
                                                </div>
                                                <div className='btn-group'>
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', question.id, '')}>
                                                        <FiPlusCircle className='icon-add' />
                                                    </span>
                                                    {question.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}>
                                                            <FiMinusCircle className='icon-remove' />
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }


                            </div>
                        )
                    })
                }
                {
                    questions && questions.length > 0 &&
                    <div>
                        <button
                            className='btn btn-warning'
                            onClick={() => handleSubmitQuestionForQuiz()}>{t('question.save')}</button>
                    </div>
                }

                {isPreviewImage === true &&
                    <Lightbox
                        image={dataImagePreview.url}
                        title={dataImagePreview.title}
                        onClose={() => setIsPreviewImage(false)}>
                    </Lightbox>
                }
            </div>

        </div>
    )
}

export default QuizQA;