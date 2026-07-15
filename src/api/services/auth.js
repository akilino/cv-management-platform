import {authApi} from "../clients/axios"

export const loginRequest = (email, password) => {
  return authApi.post("/auth/login",{
    email:email,
    password:password
  });
};

export const getStatusRequest = () => {
  return authApi.get("/auth/status");
};

export const getRefreshToken = () => {
  return authApi.post("/auth/refresh");
};
 
export const logoutRequest = () => {
  return authApi.post("/auth/logout");
};
