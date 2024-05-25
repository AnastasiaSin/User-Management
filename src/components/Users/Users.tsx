import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Link, useNavigate } from 'react-router-dom';
import styles from './users.module.css';
import Logout from '../PrivateLayout/Logout';
import { LikeIcon } from '../../icons/likeIcon';
import { fetchUsers } from '../../redux/slices/userSlice';
import { ArrowIcon } from '../../icons/ArrowIcon';

const Users: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { users, loading, perPage, total } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      if (users.length === 0) {
        dispatch(fetchUsers(perPage));
      }
    }
  }, [dispatch, isAuthenticated, navigate, users.length, perPage]);

  const loadMore = () => {
    if (users.length < total) {
      dispatch(fetchUsers(users.length + perPage));
    }
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>Наша команда</h1>
        <p className={styles.descr}>
          Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций.
        </p>
        <nav className={styles.nav}>
          <Logout />
        </nav>
      </header>

      <main>
        <div className={styles.container}>
          <ul className={styles.usersList}>
            {users.map((user) => (
              <li className={styles.userItem} key={user.id}>
                <Link to={`/users/${user.id}`} className={styles.userLink}>
                  <div className={styles.imgBlock}>
                    <img className={styles.avatar} src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
                  </div>
                  <span className={styles.userName}>{user.first_name} {user.last_name}</span>
                </Link>
                <div className={styles.iconBlock}>
                  <button className={styles.likeBtn}>
                    <LikeIcon iconStyle={styles.icon} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {users.length < total && (
            <button className={styles.loadMoreBtn} onClick={loadMore} disabled={loading}>
              {loading ? 'Загрузка...' : 'Показать еще'}
              <ArrowIcon/>
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Users;
