import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import styles from './auth.module.css'
import { AuthForm } from './Form/AuthForm';

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const loading = useAppSelector((state) => state.auth.loading)
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');


  const handleClick = () => {
      navigate('/login');
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/users'); 
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(register({ email, password }));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Регистрация</h2>
      <button className={styles.btnLogin} onClick={handleClick}>Войти</button>
      <AuthForm 
      handleSubmit={handleSubmit}
      loading={loading}
      name={name}
      email={email}
      password={password}
      setName={setName}
      setEmail={setEmail}
      setPassword={setPassword}
    

      />
    </div>
  );
};

export default Register;
