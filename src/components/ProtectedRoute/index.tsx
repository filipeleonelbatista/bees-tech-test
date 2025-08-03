import { Navigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { name, isAdult } = useUser();
    if (name === '' || !isAdult) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default ProtectedRoute;