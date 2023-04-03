import React from 'react';
import Sidebar from '@components/Sidebar';
import Content from '@components/Content';
import ContextProvider from '@services/ContextProvider';
import './App.css'

const App = () => {
  return (
    <ContextProvider model="User">
      <div className="Dashboard__wrapper" data-testid="dashboard-wrapper">
        <Sidebar />
        <Content />
      </div>
    </ContextProvider>
  );
}

export default App;
