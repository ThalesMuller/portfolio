import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Experiences, Home } from 'src/components/pages';

const SystemRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/experiences" element={<Experiences />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default SystemRoutes;
