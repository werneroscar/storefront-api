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

const getInvalidAuthPasswordOrUserIdError = (
  fn: Function,
  password: string
): unknown => {
  let error;

  try {
    fn(password);
    return undefined;
  } catch (e) {
    error = e;
  }

  return error;
};

export { getInvalidDetailsError, getInvalidAuthPasswordOrUserIdError };
