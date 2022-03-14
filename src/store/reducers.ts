import { GET_SERVICE_DATA, SELECT_SERVICE } from './actions';

export const serviceReducer = (state: any, action: any) => {
  const { type, data } = action;
  switch (type) {
    case GET_SERVICE_DATA: {
      return {
        ...state,
        services: data
      }
    }
    case SELECT_SERVICE:
      return {
        ...state,
        selectedService: data
      }
    default: {
      return state;
    }
  }
}
