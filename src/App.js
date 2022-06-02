import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ServiceEdit from './components/ServiceEdit/ServiceEdit';
import ServiceList from './components/ServiceList/ServiceList';

function App() {
  return (
    <Routes>
      <Route path='/services' element={<ServiceList />} />
      <Route path='/services/:serviceId' element={<ServiceEdit />} />
      <Route path='/' element={<Navigate to='/services' replace />} />
    </Routes>
  );
}

export default App;
