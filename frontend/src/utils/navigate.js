import { useNavigate } from 'react-router-dom';

export default function useNavigateRedirect() {

    const navigate = useNavigate();
    function redirectToLogin() {
        navigate('/login');
    }
}