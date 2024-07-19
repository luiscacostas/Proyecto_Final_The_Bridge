import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserList from './UserList';
import UserForm from './UserForm';
import TokenList from './TokenList';
import TokenForm from './TokenForm';

const Dashboard = () => {
  return (
    <Router>
      <div className="dashboard">
        <nav>
          <ul>
            <li><Link to="/admin/users">Manage Users</Link></li>
            <li><Link to="/admin/tokens">Manage Tokens</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/users/new" element={<UserForm />} />
          <Route path="/admin/users/edit/:id" element={<UserForm />} />
          <Route path="/admin/tokens" element={<TokenList />} />
          <Route path="/admin/tokens/new" element={<TokenForm />} />
          <Route path="/admin/tokens/edit/:id" element={<TokenForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Dashboard;