import API from "./Api";

export const loginUser = async (userData) => {
    const res = await API.post("/user/login", userData);
    return res.data;
};
