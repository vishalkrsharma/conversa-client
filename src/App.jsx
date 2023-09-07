import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import axios from 'axios';

const App = () => {
  axios.defaults.baseURL = import.meta.VITE_SERVER_URL || 'http://127.0.0.1:5000';

  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={<HomePage />}
        />
        <Route
          path='/chats'
          element={<ChatPage />}
        />
      </Routes>
    </div>
  );
};

export default App;
