import { useEffect, useState } from "react";
import { getQuizByUser } from "../../service/apiService";
import './ListQuiz.scss'
import { useNavigate } from "react-router-dom";

const ListQuiz = (props) => {
    const [arrayQuiz, setArrayQuiz] = useState([]);
    useEffect(() => {
        getQuizData();
    }, [])

    const navigate = useNavigate();

    const getQuizData = async () => {
        const res = await getQuizByUser();
        console.log(res);
        if (res && res.EC === 0) {
            setArrayQuiz(res.DT)
        }
    }
    return (
        <div className="list-quiz-container container">
            {arrayQuiz && arrayQuiz.length > 0 &&
                arrayQuiz.map((quiz, index) => {
                    return (
                        <div key={`${index}-quiz`} className="card" style={{ width: "18rem" }}>
                            <img src={`data:image/jpeg;base64,${quiz.image}`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Quiz {index + 1}</h5>
                                <p className="card-text">{quiz.description}</p>
                                <button 
                                className="btn btn-primary"
                                onClick={()=> navigate(`/quiz/${quiz.id}`)}
                                >Start Now</button>
                            </div>
                        </div>
                    )
                }
                )}

            {arrayQuiz && arrayQuiz.length === 0 &&
                <div>
                    You don't have any quiz now...
                </div>
            }
        </div>
    )
}

export default ListQuiz;