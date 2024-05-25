import React from 'react';
import styles from './auth.module.css'
import { Outlet } from 'react-router-dom';

const PublicLayout: React.FC = () => {

    return (
        <div className={styles.wrapper}>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default PublicLayout;
