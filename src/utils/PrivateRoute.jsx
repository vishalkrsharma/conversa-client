import { Outlet, Navigate } from 'react-router-dom';
import { ChatState } from '../contexts/ChatProvider';
import HomePage from '../pages/HomePage';

const PrivateRoute = () => {
  const { user } = ChatState();

  return Object.keys(user).length !== 0 ? <Outlet /> : <HomePage />;
};

export default PrivateRoute;
