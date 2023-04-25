import { useState } from "react"
import { useEffect } from "react"
import { getAllQuizForAdmin } from "../../../../service/apiService"

const TableQuiz = (props) => {
    
    const {listQuiz} = props;

    useEffect(() => {
        props.fetchQuiz();
    }, [])

    return (
        <div>
            <>
                <div>List Quizzes</div>
                <table class="table table-striped table-hover table-bordered mt-2 my-2">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Type</th>
                            <th scope="col">Actions</th>
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
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => props.handleClickDeleteQuiz(item)}
                                        >
                                            Delete
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