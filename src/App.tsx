import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PlanScreen from './components/PlanScreen';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {

  return (
    <div className="App">
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PlanScreen />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
