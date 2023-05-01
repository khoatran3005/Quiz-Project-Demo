import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../service/apiService';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import Languages from './Languages';
import { useTranslation, Trans } from 'react-i18next';
import Profile from './Profile';
import { useState } from 'react';


const Header = () => {

  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const account = useSelector(state => state.user.account)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [showModalProfile, setShowModalProfile] = useState(false);

  const handleLogin = () => {
    navigate('/login')
  }

  const handleRegister = () => {
    navigate('/register')
  }

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
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          {/* <Navbar.Brand href="#home">Hoi Khoa Dep Trai</Navbar.Brand> */}
          <NavLink to="/" className="navbar-brand">Quiz With Khoa</NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">{t('header.home')}</NavLink>
              <NavLink to="/users" className="nav-link">{t('header.users')}</NavLink>
              <NavLink to="/admin" className="nav-link">{t('header.admin')}</NavLink>
            </Nav>
            <Nav>
              {isAuthenticated === false ?
                <>
                  <button className='btn-login' onClick={() => handleLogin()}>{t('header.login')}</button>
                  <button className='btn-signup' onClick={() => handleRegister()}>{t('header.signup')}</button>
                </>
                :
                <NavDropdown title={t('header.setting')} id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => setShowModalProfile(true)}>{t('header.profile')}</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleLogOut()}>{t('header.logout')}</NavDropdown.Item>
                </NavDropdown>
              }
              <Languages/>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Profile
        show={showModalProfile}
        setShow={setShowModalProfile}
        account={account} />
    </>
  );
}

export default Header;