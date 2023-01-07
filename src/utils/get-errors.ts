import { UserDetails } from '../types/user';

const getInvalidDetailsError = async (
  fn: Function,
  details: UserDetails
): Promise<unknown> => {
  let error;

  try {
    await fn(details);
  } catch (e) {
    error = e;
  }

  return error;
};

const getInvalidIdError = async (
  fn: Function,
  id: string
): Promise<unknown> => {
  let error;

  try {
    await fn(id);
  } catch (e) {
    error = e;
  }

  return error;
};

const getInvalidAuthPasswordError = (
  fn: Function,
  password: string
): unknown => {
  let error;

  try {
    fn(password);
  } catch (e) {
    error = e;
  }

  return error;
};

export {
  getInvalidDetailsError,
  getInvalidAuthPasswordError,
  getInvalidIdError
};
