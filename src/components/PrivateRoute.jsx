// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import PropTypes from 'prop-types';

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/" />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
