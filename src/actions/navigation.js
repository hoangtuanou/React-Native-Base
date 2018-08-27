import { REDIRECT } from './actionTypes';

export const redirectTo = (screen, params) => ({
  type: REDIRECT,
  screen,
  params,
});

export default {};
