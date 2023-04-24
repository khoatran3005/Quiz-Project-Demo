import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import User from './components/User/User';
import ListQuiz from './components/User/ListQuiz'
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import ManageUser from './components/Admin/Content/ManageUser';
import Dashboard from './components/Admin/Content/DashBoard';
import Login from './components/Auth/Login';
import App from './App';
import Register from "./components/Auth/Register";
import { ToastContainer, toast } from 'react-toastify';
import DetailQuiz from "./components/User/DetailQuiz";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";

const NotFound = () => {
    return (
        <div className="container mt-3 alert alert-danger">
            404.Not Found data with your current URL
        </div>
    )
}
const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />}></Route>
                    <Route path="users" element={<ListQuiz />}></Route>
                </Route>
                <Route path="/quiz/:id" element={<DetailQuiz />}></Route>

                <Route path="/admin" element={<Admin />}>
                    <Route index element={<Dashboard />} />
                    <Route path="manage-users" element={<ManageUser />} />
                    <Route path="manage-quiz" element={<ManageQuiz />} />
                </Route>

                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default Layout;