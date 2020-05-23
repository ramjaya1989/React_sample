import initialState from "./initialState";

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SERVICE_LIST":
      return Object.assign({}, state, {
        service_response: action.payload
      });
    case "PROVIDER_LIST":
      return Object.assign({}, state, {
        provider_response: action.payload,
        filterProvider_response: action.payload.data
      });
    case "FILTER_PROVIDER_LIST":
      return Object.assign({}, state, {
        filterProvider_response: action.payload
      });

    default:
      return state;
  }
};

export default serviceReducer;
