import React from 'react';
import './App.css';
import '@ant-design/v5-patch-for-react-19'; 
import AllRoute from './components/AllRoute';
import { MorningProvider } from './contexts/MorningContext';

function App() {
  return (
    <MorningProvider>
      <AllRoute />
    </MorningProvider>
  );
}

export default App;
