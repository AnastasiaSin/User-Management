import React, { useEffect, useState } from 'react';
import { login } from '../../redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from './Form/AuthForm';
import styles from './auth.module.css'


const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading } = useAppSelector((state) => state.auth);

    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/users');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    const handleClick = () => {
        navigate('/register');
    }


    return (
        <div className={styles.container}>
            <button className={styles.btnLogin} onClick={handleClick}>Зарегистрироваться</button>
            <h2 className={styles.title}>Вход</h2>
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

export default Login;
