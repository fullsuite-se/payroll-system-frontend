import hris_api from "../configs/api.config";

export const getUser = async () => {
    return await hris_api.get("/api/hris-user-accounts/user/me/basic-info");
}