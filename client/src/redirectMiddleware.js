import history from "./history";

export const REDIRECT_TO_MAIN = "REDIRECT_TO_MAIN";

export const createMiddleware = handlers => {
  return store => next => action => {
    const actionHandler = handlers.find(
      handler => handler.type === action.type
    );

    let result = next(action);

    if (actionHandler && actionHandler.afterHandler) {
      actionHandler.afterHandler(action.pathName);
    }

    return result;
  };
};

export const redirectMiddleware = createMiddleware([
  {
    type: REDIRECT_TO_MAIN,
    afterHandler: pathname => {
      history.push(pathname);
    }
  }
]);
