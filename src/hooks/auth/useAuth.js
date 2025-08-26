import { useState } from "react";
import { loginUser } from "../../services/auth.service";
import getErrorMessage from "../../utility/error.utility";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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

            //decode the token
            const decoded = jwtDecode(token);

            localStorage.setItem("system_user_id", decoded.system_user_id);
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