import { useCallback, useReducer } from "react";

const httpReducer = (state, action) => {
  switch (action.type) {
    case "SEND": {
      return {
        status: "pending",
        data: null,
        error: null,
      };
    }
    case "SUCCESS": {
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
      return state;
    }
  }
};

const useHttp = (requestFunction) => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: null,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async function (requestData) {
      dispatch({ type: "SEND" });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: "SUCCESS", responseData });
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
