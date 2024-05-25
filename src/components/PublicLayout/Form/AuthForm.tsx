import { FormEventHandler, useState, useEffect, useCallback } from 'react';
import styles from './authForm.module.css';
import { useLocation } from 'react-router-dom';

interface IForm {
    handleSubmit: FormEventHandler<HTMLFormElement>;
    loading: boolean;
    name: string;
    email: string;
    password: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
}

interface IErrors {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const AuthForm = ({
    handleSubmit,
    loading,
    name,
    password,
    email,
    setEmail,
    setName,
    setPassword
}: IForm) => {
    const location = useLocation();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<IErrors>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setErrors({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    }, [location.pathname]);

    const validateField = useCallback((field: string, value: string) => {
        let error = '';

        switch (field) {
            case 'name':
                if (location.pathname === '/register' && !value) {
                    error = 'Имя обязательно';
                }
                break;
            case 'email':
                if (!value) {
                    error = 'Электронная почта обязательна';
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    error = 'Некорректный формат электронной почты';
                }
                break;
            case 'password':
                if (!value) {
                    error = 'Пароль обязателен';
                } else if (value.length < 6) {
                    error = 'Пароль должен быть не менее 6 символов';
                }
                break;
            case 'confirmPassword':
                if (location.pathname === '/register' && value !== password) {
                    error = 'Пароли не совпадают';
                }
                break;
            default:
                break;
        }

        setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    }, [location.pathname, password]);

    useEffect(() => {
        const isRegisterPage = location.pathname === '/register';
        const isFormFilled = isRegisterPage ? name && email && password && confirmPassword : email && password;
        const hasNoErrors = Object.values(errors).every(error => !error);

        setIsFormValid(Boolean(isFormFilled && hasNoErrors));
    }, [name, email, password, confirmPassword, errors, location.pathname]);

    const onBlur = (field: string, value: string) => {
        validateField(field, value);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validateField('confirmPassword', confirmPassword);
        if (isFormValid && !errors.confirmPassword) {
            handleSubmit(e);
        }
    };

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            {location.pathname === '/register' && (
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="name">Имя</label>
                    <input
                        className={`${styles.input} ${errors.name ? styles.error : ''}`}
                        type="text"
                        id="name"
                        placeholder='Артур'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={(e) => onBlur('name', e.target.value)}
                    />
                    {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                </div>
            )}

            <div className={styles.field}>
                <label className={styles.label} htmlFor="email">Электронная почта</label>
                <input
                    className={`${styles.input} ${errors.email ? styles.error : ''}`}
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={(e) => onBlur('email', e.target.value)}
                    placeholder='example@mail.ru'
                />
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            <div className={styles.field}>
                <label className={styles.label} htmlFor="password">Пароль</label>
                <input
                    className={`${styles.input} ${errors.password ? styles.error : ''}`}
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={(e) => onBlur('password', e.target.value)}
                />
                {errors.password && <span className={styles.errorText}>{errors.password}</span>}
            </div>

            {location.pathname === '/register' && (
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="confirmPassword">Подтвердите пароль</label>
                    <input
                        className={`${styles.input} ${errors.confirmPassword ? styles.error : ''}`}
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={(e) => onBlur('confirmPassword', e.target.value)}
                    />
                    {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}
                </div>
            )}

            <button className={styles.btn} disabled={loading || !isFormValid || (location.pathname === '/register' && confirmPassword !== password)} type="submit">
                {location.pathname === '/register' ? 'Зарегистрироваться' : 'Войти'}
            </button>
        </form>
    );
};
