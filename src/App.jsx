import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import ServiceList from './components/ServiceList';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/services" element={<PrivateRoute><ServiceList /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
