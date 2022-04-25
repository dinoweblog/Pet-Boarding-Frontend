export const USERS_PETS_LOADING = "USERS_PETS_LOADING";
export const USERS_PETS_SUCCESS = "USERS_PETS_SUCCESS";
export const USERS_PETS_ERROR = "USERS_PETS_ERROR";

export const usersPetsLoadingFun = () => ({
  type: USERS_PETS_LOADING,
});

export const usersPetsSuccessFun = (payload) => ({
  type: USERS_PETS_SUCCESS,
  payload,
});

export const usersPetsErrorFun = () => ({
  type: USERS_PETS_SUCCESS,
});

export const getUsersPetsData = () => (dispatch) => {
  dispatch(usersPetsLoadingFun());
  fetch(`https://pet-boarding-server.herokuapp.com/pets/all`)
    .then((res) => res.json())
    .then((res) => {
      dispatch(usersPetsSuccessFun(res));
    })
    .catch((error) => dispatch(usersPetsErrorFun()));
};
