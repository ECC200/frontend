import { useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const EncryptRoute = ({ path, encryptedPath, children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === path) {
            navigate(encryptedPath, { replace: true });
        }
    }, [location, navigate, path, encryptedPath]);

    if (location.pathname === encryptedPath) {
        return children;
    }

    return null;
};

export default EncryptRoute;