    import { Navigate, Outlet } from 'react-router-dom';
    import useAuth from '../hooks/useAuth'; 

    const ProtectedRoute = () => {
        const { isAuthenticated, isLoading } = useAuth();

        if (isLoading) {
            return <div>Loading authentication...</div>; 
        }

        return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
    };

    export default ProtectedRoute;
