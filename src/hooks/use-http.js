import { useCallback, useReducer } from "react";

const httpReducer = (state, action) => {
  switch (action.type) {
    case "SEND": {
      // console.log("sending")
      return {
        status: "pending",
        data: null,
        error: null,
      };
    }
    case "SUCCESS": {
      // console.log("success")
      return {
        status: "completed",
        data: action.responseData,
        error: null,
      };
    }
    case "ERROR": {
      return {
        status: "completed",
        data: null,
        error: action.errorMessage,
      };
    }
    default: {
      return defaultState;
    }
  }
};
const defaultState = {
  status: null,
  data: null,
  error: null,
};
const useHttp = (requestFunction) => {
  const [httpState, dispatch] = useReducer(httpReducer, defaultState);

  const sendRequest = useCallback(
    async function (requestData) {
      dispatch({ type: "SEND" });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: "SUCCESS", responseData: responseData });
        // console.log(responseData);
      } catch (error) {
        dispatch({
          type: "ERROR",
          errorMessage: error.message || "Somthing went wrong",
        });
      }
    },
    [requestFunction]
  );
  return {
    sendRequest,
    ...httpState,
  };
};

export default useHttp;
