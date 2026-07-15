import { apiClient } from "../clients/axios";

const DEFAULT_PROFILE_ID = "6bff1444-3f14-4801-a6aa-1a6145244345";

export const getProfile = (profileId = DEFAULT_PROFILE_ID) =>
  apiClient.get(`/api/admin/profiles/${profileId}`);

export const getProfilesPreviewForAdmin = () => {
  return apiClient.post("/graphql", {
    query: `
        query GetProfilesForAdmin {
            profilesForAdmin {
                id
                fullName
                nationality
                email
                aboutMe
                profilePictureUrl
                showEmail
                roleTitle
            }
        }
    `,
  });
};

export const getProfileForAdmin = (profileId) => {
  return apiClient.post("/graphql", {
    query: `
        query GetProfile($id: ID!) {
            profileForAdmin(id: $id) {
                id
                fullName
                nationality
                birthDate
                email
                phoneNumber
                gender
                homeAddress
                aboutMe
                profilePictureUrl
                roleTitle
                showEmail
                showPhone
                showHomeAddress
            }
        }
    `,
    variables: {
      id: profileId,
    },
  });
};
