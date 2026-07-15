import { apiClient } from "../clients/axios";

export const addExperienceForUserId = (userId,experience) => {
  const experienceInput = {
    ...experience,
    userId: userId
  };

  return apiClient.post("/graphql",{
    query: `
      mutation CreateNewExperience($input: ExperienceRequest!){
        createExperience(input: $input){
          id
          companyName
          startDate
          endDate
          location
          methodology
          roleTitle
          technologies
          description
          client
        }
      }
    `,
    variables:{
      input: experienceInput
    }
  });
};

export const getExperiencesByUserId = (userId) => {
  return apiClient.post("/graphql", {
    query: `
        query GetExperiencesByUser($id: ID!) {
            experiencesByUserId(userId: $id) {
              id
              companyName
              startDate
              endDate
              location
              methodology
              roleTitle
              technologies
              description
              client
              highlights                  
            }
        }
    `,
    variables: {
      id: userId,
    },
  });
};

export const getExperienceById = (id) => {
  return apiClient.post("/graphql", {
    query: `
        query GetExperienceById($id: ID!) {
            experience(id: $id) {
              id
              companyName
              startDate
              endDate
              location
              methodology
              roleTitle
              technologies
              description
              client
              highlights
            }
        }
    `,
    variables: {
      id: id,
    },
  });
};
