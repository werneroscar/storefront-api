import { UserDetails } from '../types/user';

const getInvalidDetailsError = async (
  fn: Function,
  details: UserDetails
): Promise<unknown> => {
  let error;

  try {
    await fn(details);
    return undefined;
  } catch (e) {
    error = e;
  }

  return error;
};

export { getInvalidDetailsError };
