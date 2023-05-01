import './DashBoard.scss';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar, CartesianGrid } from 'recharts';
import { getOverview } from '../../../service/apiService';
import { useEffect, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';

const Dashboard = (props) => {

    const [dataOverview, setDataOverview] = useState([]);
    const [dataChart, setDataChart] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        fetchDataOverView();
    }, [])

    const fetchDataOverView = async () => {
        let res = await getOverview();
        console.log('res', res);
        if (res && res.EC === 0) {
            setDataOverview(res.DT);
        }
        let Qz = 0, Qs = 0, As = 0;
        Qz = res?.DT?.others?.countQuiz ?? 0;
        Qs = res?.DT?.others?.countQuestions ?? 0;
        As = res?.DT?.others?.countAnswers ?? 0;
        const data = [
            {
                "name": "Quizzes",
                "Qz": Qz,
            },
            {
                "name": "Questions",
                "Qs": Qs,
            },
            {
                "name": "Answers",
                "As": As,
            }
        ]
        setDataChart(data)
    }

    console.log(dataOverview);
    return (
        <div className="dashboard-container">
            <div className='title'>
            {t('admin.title-db')}
            </div>
            <div className='content'>
                <div className='c-left'>
                    <div className='child'>
                        <span className='text-1'>{t('admin.user')}</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.users
                                && dataOverview.users.total ?
                                <>{dataOverview.users.total}</> : 0}
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>{t('admin.quizzes')}</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.others
                                && dataOverview.others.countQuiz ?
                                <>{dataOverview.others.countQuiz}</> : 0}
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>{t('admin.questions')}</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.others
                                && dataOverview.others.countQuestions?
                                <>{dataOverview.others.countQuestions}</> : 0}
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>{t('admin.answers')}</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.others    
                                && dataOverview.others.countAnswers ?
                                <>{dataOverview.others.countAnswers}</> : 0}
                        </span>
                    </div>
                </div>
                <div className='c-right'>
                    <ResponsiveContainer width="95%" height="100%">
                        <BarChart width={400} height={300} data={dataChart}>
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <XAxis dataKey="name" />
                            {/* <YAxis /> */}
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Qz" fill="#8884d8" />
                            <Bar dataKey="Qs" fill="#82ca9d" />
                            <Bar dataKey="As" fill="#fcb12a" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;