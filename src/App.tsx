import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import PlanScreen from './components/PlanScreen';
import Login from './components/Login';
import DashboardLayout from './views/Dashboard/Components';
import Orders from './views/Dashboard/Components/Orders';
import Users from './views/Dashboard/Components/Users';
import Plans from './views/Dashboard/Components/Plans/Index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
        <Route path="/" element={<MainLayout><PlanScreen /></MainLayout>} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="plans" element={<Plans />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
