import { PETS_LOADING, PETS_SUCCESS, PETS_ERROR } from "./action";

const initState = {
  loading: false,
  error: false,
  pets: [],
};

export const petsReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case PETS_LOADING:
      return { ...store, loading: true };
    case PETS_SUCCESS:
      return {
        ...store,
        loading: false,
        error: false,
        pets: [...payload],
      };
    case PETS_ERROR:
      return {
        ...store,
        loading: false,
        error: true,
      };
    default:
      return store;
  }
};
