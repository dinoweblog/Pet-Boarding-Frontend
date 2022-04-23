export const PETS_LOADING = "PETS_LOADING";
export const PETS_SUCCESS = "PETS_SUCCESS";
export const PETS_ERROR = "PETS_ERROR";

export const petsLoadingFun = () => ({
  type: PETS_LOADING,
});

export const petsSuccessFun = (payload) => ({
  type: PETS_SUCCESS,
  payload,
});

export const petsErrorFun = () => ({
  type: PETS_SUCCESS,
});

export const getPetsData = () => (dispatch) => {
  dispatch(petsLoadingFun());
  fetch(`http://localhost:3000/pets_data`)
    .then((res) => res.json())
    .then((res) => {
      dispatch(petsSuccessFun(res));
    })
    .catch((error) => dispatch(petsErrorFun()));
};
