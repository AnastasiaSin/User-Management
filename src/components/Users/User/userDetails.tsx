import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { fetchUserDetails } from '../../../redux/slices/userSlice';
import Logout from '../../PrivateLayout/Logout';
import styles from './user.module.css'
import { Loading } from '../../Loading/Loading';
import { EmailIcon } from '../../../icons/EmailIcon';
import { ArrowIcon } from '../../../icons/ArrowIcon';

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users.user);
  const loading = useAppSelector((state) => state.users.loading);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserDetails(id));
    }
  }, [dispatch, id]);

  return (
    <div className={styles.wrapper}>
      {loading ? (
        <Loading />
      ) : (
        user && (
          <>
            <header className={styles.header}>
              <div className={styles.imgBlock}>
                <img className={styles.avatar} src={user.data.avatar} alt={user.data.first_name} />
              </div>
              <div className={styles.nameBlock}>
                <h2>{user.data.first_name + ' ' + user.data.last_name}</h2>
                <span className={styles.subtitle}>Партнер</span>
              </div>

              <nav className={styles.nav}>
                <NavLink className={styles.backArrowLink} to={'/users'}>
                  <ArrowIcon iconStyle={styles.arrowIcon}/>
                </NavLink>

                <NavLink className={styles.backLink} to={'/users'}>Назад</NavLink>
                <Logout />
              </nav>
            </header>


            <main>

              <div className={styles.container}>
                <div>
                  <p className={styles.userDescr}>{user.support.text}</p>
                </div>
                <div className={styles.emailBlock}>
                  <EmailIcon />
                  <span className={styles.userEmail}>{user.data.email}</span>
                </div>
              </div>

            </main>
          </>
        )



      )
      }

    </div>
  );
};

export default UserDetails;
