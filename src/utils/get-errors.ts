import { UserDetails } from '../types/user';

const getInvalidDetailsError = async (fn: Function, details: UserDetails) => {
  let error;

  try {
    await fn(details);
  } catch (e) {
    error = e;
  }

  return error;
};

export { getInvalidDetailsError };
