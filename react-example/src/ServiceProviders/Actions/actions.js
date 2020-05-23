export const saveServiceResponse = response => {
  return {
    type: "SERVICE_LIST",
    payload: response
  };
};

export function saveProviderResponse(response) {
  return {
    type: "PROVIDER_LIST",
    payload: response
  };
}
export function saveFilterProviderResponse(response) {
  return {
    type: "FILTER_PROVIDER_LIST",
    payload: response
  };
}
