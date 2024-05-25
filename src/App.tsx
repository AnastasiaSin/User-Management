// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './components/PublicLayout/Login';
import Register from './components/PublicLayout/Register';
import Users from './components/Users/Users';
import UserDetails from './components/Users/User/userDetails';
import store from './redux/store';
import PublicLayout from './components/PublicLayout/PublicLayout';
import PrivateLayout from './components/PrivateLayout/PrivateLayout';


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>

          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="/" element={<PublicLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route path="/users" element={<PrivateLayout />}>
            <Route index element={<Users />} />
            <Route path=":id" element={<UserDetails />} />
          </Route>


        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
