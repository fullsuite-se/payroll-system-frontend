import { useState } from "react";
import { loginUser } from "../../services/auth.service";
import getErrorMessage from "../../utility/error.utility";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
    const [formData, setFormData] = useState({
        user_email: '',
        password: '',
        service: 'PAYROLL',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const response = await loginUser(formData);
            const { token } = response.data;
            //decode the token
            const decoded = jwtDecode(token);
            localStorage.setItem("system_user_id", decoded.system_user_id);
            localStorage.setItem('token', token);
            window.location.href = "/dashboard"
        } catch (error) {
            alert(getErrorMessage(error));
            console.log('error: ', getErrorMessage(error));

            setError("Registration failed");
        }
        finally {
            setIsLoading(false);
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