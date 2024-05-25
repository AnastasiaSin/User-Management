import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { logout } from '../../redux/slices/authSlice';
import styles from './privatStyles.module.css'
import { ExitIcon } from '../../icons/ExitIcon';


const Logout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = ()=> {
    dispatch(logout());
    navigate('/login'); 
  }

  return (
    <button className={styles.btnLogout} onClick={handleClick}>
      <ExitIcon iconStyle={styles.iconArrow}/>
     <span className={styles.exitText}>Выйти</span>
    </button>
  )
};

export default Logout;
