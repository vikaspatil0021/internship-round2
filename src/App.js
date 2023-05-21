import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/login/Login';
import Header from './components/Header/Header';
import Register from './components/register/Register';
import Main from './components/main/Main';

function App() {
  return (
    <div className="App mt-4 pt-4">
    <div>

      <Header />
    </div>
      <Router>
        <Routes>
        <Route path="/" exact element={<Main />} />

          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
