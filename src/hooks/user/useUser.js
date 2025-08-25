import { useEffect, useState } from "react";
import { getUser } from "../../services/user.service";

const useUser = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await getUser();
                setUser(response.data.user);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserInfo();
    }, []);

    return {
        user, setUser
    };
}

export default useUser;