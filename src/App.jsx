import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import axios from 'axios';
import PrivateRoute from './utils/PrivateRoute';
import { ChatState } from './contexts/ChatProvider';
import SideDrawer from './components/miscellaneous/SideDrawer';

const App = () => {
  axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL || 'http://127.0.0.1:5000';

  const { user } = ChatState();

  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={Object.keys(user).length === 0 ? <HomePage /> : <PrivateRoute />}
        />
        <Route element={<PrivateRoute />}>
          <Route
            index
            element={<ChatPage />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
