    import { useState, useEffect } from 'react';

    const useAuth = () => {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            const checkAuth = async () => {
                const token = localStorage.getItem('token');
                if (token) {
                    setIsAuthenticated(true);
                }
                setIsLoading(false);
            };
            checkAuth();
        }, []);

        return { isAuthenticated, isLoading };
    };

    export default useAuth;