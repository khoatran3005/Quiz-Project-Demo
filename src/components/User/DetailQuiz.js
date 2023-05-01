import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../service/apiService";
import _ from 'lodash'
import "./DetailQuiz.scss"
import Question from "./Question";
import { useState } from "react";
import { Modal } from "bootstrap";
import ModelResult from "./ModelResult";
import RightContent from "./Content/RightContent";
import { useTranslation, Trans } from 'react-i18next';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useNavigate } from 'react-router-dom';

const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);

    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState();

    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1)
    }

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1)
            setIndex(index + 1)
    }

    const handleCheckBox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz)
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if (question && question.answers) {
            let b = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            question.answers = b;
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    }

    const handleFinish = async () => {
        let payload = {
            quizId: +quizId,
            answers: []
        };
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(item => {
                let questionId = item.questionId;
                let userAnswerId = []

                item.answers.forEach(a => {
                    if (a.isSelected) {
                        userAnswerId.push(a.id)
                    }
                })
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
        }
        payload.answers = answers;
        let res = await postSubmitQuiz(payload);
        console.log('gg', res)
        if (res && res.EC === 0) {
            setDataModalResult({
                countCorrect: res.DT.countCorrect,
                countTotal: res.DT.countTotal,
                quizData: res.DT.quizData
            })
            setIsShowModalResult(true);
        } else {
            alert('something wrong')
        }
    }

    useEffect(() => {
        fetchQuestions();
    }, [quizId])

    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null;

                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers)
                    })
                    answers = _.orderBy(answers, ['id'], ['asc']);
                    return (
                        { questionId: key, answers, questionDescription, image }
                    )
                })
                .value();
            setDataQuiz(data);
        }
    }
    return (
        <>
            <Breadcrumb className="quiz-detail-new-header">
                <Breadcrumb.Item href="/">
                {t('header.home')}
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/users">
                {t('header.users')}
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                {t('header.doquiz')}
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className="detail-quiz-container">
                <div className="left-container">
                    <div className="title">
                        Quiz {quizId}: {location?.state?.quizTitle}
                    </div>
                    <hr />
                    <div className="q-body">
                        <img />
                    </div>
                    <div className="q-content">
                        <Question
                            handleCheckBox={handleCheckBox}
                            index={index}
                            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}></Question>
                    </div>
                    <div className="footer mb-4">
                        <button
                            className="btn btn-secondary"
                            onClick={() => handlePrev()}>{t('user.prev')}</button>
                        <button
                            className="btn btn-primary"
                            onClick={() => handleNext()}>{t('user.next')}</button>
                        <button
                            className="btn btn-warning"
                            onClick={() => handleFinish()}>{t('user.finish')}</button>
                    </div>
                </div>
                <div className="right-container">
                    <RightContent
                        dataQuiz={dataQuiz}
                        handleFinish={handleFinish}
                        setIndex={setIndex} />
                </div>
                <ModelResult
                    show={isShowModalResult}
                    setShow={setIsShowModalResult}
                    dataModalResult={dataModalResult}
                />
            </div>
        </>
    )
}

export default DetailQuiz;