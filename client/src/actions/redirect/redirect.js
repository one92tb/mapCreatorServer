export const REDIRECT_TO_MAIN = "REDIRECT_TO_MAIN";
export const pathName = "./";

export const redirectToMain = () => ({
  type: REDIRECT_TO_MAIN,
  pathName
});
