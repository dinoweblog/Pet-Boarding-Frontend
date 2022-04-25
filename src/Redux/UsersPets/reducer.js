import {
  USERS_PETS_LOADING,
  USERS_PETS_SUCCESS,
  USERS_PETS_ERROR,
} from "./action";

const initState = {
  loading: false,
  error: false,
  usersPets: [],
};

export const usersPetsReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case USERS_PETS_LOADING:
      return { ...store, loading: true };
    case USERS_PETS_SUCCESS:
      return {
        ...store,
        loading: false,
        error: false,
        usersPets: [...payload],
      };
    case USERS_PETS_ERROR:
      return {
        ...store,
        loading: false,
        error: true,
      };
    default:
      return store;
  }
};
