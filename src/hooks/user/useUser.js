import { useEffect, useState } from "react";
import { getUser } from "../../services/user.service";

const useUser = () => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchUserInfo = async () => {
            setLoading(true);
            try {
                const response = await getUser();
                setUser(response.data.user);
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchUserInfo();
    }, []);

    return {
        user, setUser,
        loading, setLoading
    };
}

export default useUser;