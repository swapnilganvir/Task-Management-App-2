import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = props => {
  const URL = 'http://localhost:4000';

  const [tasksData, setTasksData] = useState([]);
  const [userID, setUserID] = useState(null);

  async function loadData() {
    if (userID) {
      const response = await axios.post(`${URL}/api/task/list`, {
        user_id: userID,
      });
      if (response.data.success) {
        const sortedData = response.data.data;
        sortedData.sort((a, b) => a.id - b.id);
        setTasksData(sortedData);
      } else {
        console.log(response.data.message);
      }
    }
  }

  useEffect(() => {
    loadData();
  }, [userID]);

  const contextValue = {
    URL,
    tasksData,
    loadData,
    userID,
    setUserID,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
