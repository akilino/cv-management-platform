import apiClient from "../clients/apiClient";

/**
 * User Service
 * Dedicated network requests regarding User Authentication and Profiles.
 */
export const userService = {
    // get current user profile
    getProfile: async () => {
        const response = await apiClient.get('/user/profile');
        return response.data;
    },

    // update user profile data
    updateProfile: async (userData) => {
        const response = await apiClient.put('/user/profile',userData);
        return response.data;
    },
}