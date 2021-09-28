const toJSON = (resp) => resp.json();
const Api = {
  BASE_PATH: "/PxPUC",
  ENDPOINTS: {
    // Endpoints correspond with the URL paths in urls.py
    getLocations: () => `${Api.BASE_PATH}/locations`,
    getLocation: (lid) => `${Api.BASE_PATH}/location/${lid}`,
    getLocationContract: (lid) => `${Api.BASE_PATH}/location/${lid}/contract`,
    getLocationContractFile: (lid, format) =>
      `${Api.BASE_PATH}/location/${lid}/contract/download?format=${format}`,
    getLocationQuestions: (lid) => `${Api.BASE_PATH}/location/${lid}/questions`,
    getLocationProblematicSentences: (lid) =>
      `${Api.BASE_PATH}/location/${lid}/problematic-sentences`,
    getLocationGlossary: (lid) => `${Api.BASE_PATH}/location/${lid}/glossary`,
    getLocationStages: (lid) => `${Api.BASE_PATH}/location/${lid}/stages`,
    getResearcherSearchResults: (query) =>
      `${Api.BASE_PATH}/researcher?query=${JSON.stringify(query)}`,
  },
  getLocations: () => {
    return fetch(Api.ENDPOINTS.getLocations()).then(toJSON);
  },
  getLocation: (lid) => {
    return fetch(Api.ENDPOINTS.getLocation(lid)).then(toJSON);
  },
  getLocationContract: (lid) => {
    return fetch(Api.ENDPOINTS.getLocationContract(lid)).then(toJSON);
  },
  getLocationContractFile: (lid, format) => {
    return fetch(Api.ENDPOINTS.getLocationContractFile(lid, format));
  },
  getLocationQuestions: (lid) => {
    return fetch(Api.ENDPOINTS.getLocationQuestions(lid)).then(toJSON);
  },
  getLocationProblematicSentences: (lid) => {
    return fetch(Api.ENDPOINTS.getLocationProblematicSentences(lid)).then(
      toJSON
    );
  },
  getLocationGlossary: (lid) => {
    return fetch(Api.ENDPOINTS.getLocationGlossary(lid)).then(toJSON);
  },
  getLocationStages: (lid) => {
    return fetch(Api.ENDPOINTS.getLocationStages(lid)).then(toJSON);
  },
  getResearcherSearchResults: (query) => {
    return fetch(Api.ENDPOINTS.getResearcherSearchResults(query)).then(toJSON);
  },
};
export default Api;
