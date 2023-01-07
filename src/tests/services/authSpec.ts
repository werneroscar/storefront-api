import { AuthService } from '../../services/Auth';
const { ADMIN_PASSWORD } = process.env;
import { getInvalidAuthPasswordError } from '../../utils/get-errors';
import { UnauthenticatedError } from '../../errors';

describe('Auth service', () => {
  it('should have an generateToken method', () => {
    expect(AuthService.generateToken).toBeDefined();
  });

  it('should throw Unauthenticated Error if password is wrong', () => {
    const error = getInvalidAuthPasswordError(
      AuthService.generateToken,
      '1234'
    );

    expect(error).toEqual(new UnauthenticatedError('Incorrect password'));
  });

  it('should NOT throw Unauthenticated Error if password is correct', () => {
    const error = getInvalidAuthPasswordError(
      AuthService.generateToken,
      ADMIN_PASSWORD as string
    );

    expect(error).toBeUndefined();
  });

  it('should return token if password is correct', () => {
    expect(AuthService.generateToken(ADMIN_PASSWORD as string)).toBeTruthy();
  });
});
