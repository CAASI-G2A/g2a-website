const toJSON = (resp) => resp.json();
const Api = {
  BASE_PATH: "/PxPUC",
  getLocations: () => {
    return fetch(`${Api.BASE_PATH}/locations`).then(toJSON);
  },
  getLocation: (lid) => {
    return fetch(`${Api.BASE_PATH}/location/${lid}`).then(toJSON);
  },
  getLocationContract: (lid) => {
    return fetch(`${Api.BASE_PATH}/location/${lid}/contract`).then(toJSON);
  },
  getLocationQuestions: (lid) => {
    return fetch(`${Api.BASE_PATH}/location/${lid}/questions`).then(toJSON);
  },
  getLocationStages: (lid) => {
    return fetch(`${Api.BASE_PATH}/location/${lid}/stages`).then(toJSON);
  },
  getResearcherSearchResults: (query) => {
    return fetch(
      `${Api.BASE_PATH}/researcher?query=${JSON.stringify(query)}`
    ).then(toJSON);
  },
};
export default Api;
