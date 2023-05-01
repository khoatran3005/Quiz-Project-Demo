import Select from 'react-select';
import { useState, useEffect } from 'react';
import { getAllQuizForAdmin, getAllUsers, postAssignQuiz } from '../../../../service/apiService';
import { toast } from 'react-toastify';
import { useTranslation, Trans } from 'react-i18next';

const AssignQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState('');
    const { t } = useTranslation();

    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`
                }
            })
            setListQuiz(newQuiz)
        }
    }

    const fetchUser = async () => {
        let res = await getAllUsers();
        console.log(res);
        if (res && res.EC === 0) {
            let users = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`
                }
            })
            setListUser(users)
        }
    }

    const handleAssign = async() => {
        let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setSelectedQuiz([]);
            setSelectedUser([]);
        } else {
            toast.error(res.EM);
        }
    }

    useEffect(() => {
        fetchQuiz();
        fetchUser();
    }, [])

    return (

        <div className="assign-quiz-container row">
            <div className='col-6 form-group'>
                <label className='mb-2'> {t('question.select')}:</label>
                <Select
                    value={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                />
            </div>
            <div className='col-6 form-group'>
                <label className='mb-2'> {t('question.select-u')}:</label>
                <Select
                    value={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                />
            </div>
            <div>
                <button
                    className='btn btn-warning mt-3'
                    onClick={() => handleAssign()}>
                    {t('question.as')}
                </button>
            </div>
        </div>

    )
}

export default AssignQuiz;