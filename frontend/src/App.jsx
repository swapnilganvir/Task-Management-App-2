import React, { useContext, useEffect, useState } from 'react';
import { Container } from '@mui/material';
import Header from './components/Header';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import TaskList from './pages/TaskList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreContext } from './context/StoreContext';

const App = () => {
  const { setUserID } = useContext(StoreContext);

  const [tab, setTab] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  function handleChange(e, newValue) {
    if (signedIn) {
      setTab(newValue);
    } else {
      setTab(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUserID(token[0]);
      setSignedIn(true);
      setTab(0);
    }
  }, []);

  return (
    <div>
      <ToastContainer />
      <Container>
        <Header
          tab={tab}
          setTab={setTab}
          handleChange={handleChange}
          signedIn={signedIn}
          setSignedIn={setSignedIn}
        />
        {!signedIn && <SignIn setSignedIn={setSignedIn} setTab={setTab} />}
        {tab === 0 && <Dashboard />}
        {tab === 1 && <TaskList />}
      </Container>
    </div>
  );
};

export default App;
