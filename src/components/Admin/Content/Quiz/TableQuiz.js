import { useState } from "react"
import { useEffect } from "react"
import { getAllQuizForAdmin } from "../../../../service/apiService";
import { useTranslation, Trans } from 'react-i18next';

const TableQuiz = (props) => {
    
    const {listQuiz} = props;

    const { t } = useTranslation();

    useEffect(() => {
        props.fetchQuiz();
    }, [])

    return (
        <div>
            <>
                <div>{t('quiz.list')}</div>
                <table className="table table-striped table-hover table-bordered mt-2 my-2">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">{t('quiz.name')}</th>
                            <th scope="col">{t('quiz.des')}</th>
                            <th scope="col">{t('quiz.type-t')}</th>
                            <th scope="col">{t('m-user.action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listQuiz && listQuiz.map((item, index) => {
                            return (
                                <tr key={`table-quiz-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.difficulty}</td>
                                    <td style={{ display: "flex", gap: "15px" }}>
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => props.handleClickEditQuiz(item)}
                                        >
                                            {t('quiz.edit')}
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => props.handleClickDeleteQuiz(item)}
                                        >
                                            {t('m-user.delete')}
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </>
        </div>
    )
}

export default TableQuiz