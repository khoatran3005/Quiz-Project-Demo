import SideBar from "./SideBar";
import './Admin.scss'
import { FaBars } from 'react-icons/fa';
import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-toastify/dist/ReactToastify.css';
import Languages from '../Header/Languages';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation, Trans } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../service/apiService';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import { NavLink, useNavigate } from "react-router-dom";

const Admin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { t } = useTranslation();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const account = useSelector(state => state.user.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const handleLogOut = async () => {
        let res = await logout(account.email, account.refresh_token);
        if (res && res.EC === 0) {
          dispatch(doLogout())
          navigate('/login');
    
        } else {
          toast.error(res.EM);
        }
      }
    

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed}></SideBar>
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <span onClick={() => setCollapsed(!collapsed)}>
                        <FaBars className="leftside" />
                    </span>
                    <div className="rightside">
                        <Languages />
                        <NavDropdown title={t('header.setting')} id="basic-nav-dropdown">
                            <NavDropdown.Item>{t('header.profile')}</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleLogOut()}>{t('header.logout')}</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>

                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>

            </div>

        </div>
    )
}

export default Admin;