import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      console.log("error creating auth context");
    }
    return context;
  };