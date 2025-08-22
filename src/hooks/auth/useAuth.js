import { useState } from "react";
import { loginUser } from "../../services/auth.service";
import getErrorMessage from "../../utility/error.utility";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const [formData, setFormData] = useState({
        user_email: '',
        password: '',
        service: 'PAYROLL',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const navigate = useNavigate();


    const handleLogin = async () => {
        try {
            const response = await loginUser(formData);

            const { token } = response.data;
            console.log('token', token);

            localStorage.setItem('token', token);
            navigate('/dashboard');
        } catch (error) {
            alert(getErrorMessage(error));
            console.log('error: ', getErrorMessage(error));

            setError("Registration failed");
        }
    };

    return {
        formData, setFormData,
        isLoading, setIsLoading,
        error, setError,
        handleLogin,
    }
};

export default useAuth;