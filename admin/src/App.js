import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Test from './test';
import ShowTable from './showTable';
import UpdateTable from './updateTable';
import AddData from './AddData';
import Corbeille from './Corbeille';
import Navbar from './Navbar';
import Login from './Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  }

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/test" element={<><Navbar  isAuthenticated={isAuthenticated} onLogout={handleLogout}/><Test /></>} />
            <Route path="/table-data/:tableName" element={<><Navbar   isAuthenticated={isAuthenticated} onLogout={handleLogout}/><ShowTable /></>} />
            <Route path="/table-data/:tableName/:id" element={<><Navbar   isAuthenticated={isAuthenticated} onLogout={handleLogout}/><UpdateTable /></>} />
            <Route path="/add-data/:tableName" element={<><Navbar  isAuthenticated={isAuthenticated} onLogout={handleLogout}/><AddData /></>} />
            <Route path="/Corbeille" element={<><Navbar  isAuthenticated={isAuthenticated} onLogout={handleLogout} /><Corbeille /></>} />
          </>
        ) : null}
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </Router>
  );
}

export default App;
