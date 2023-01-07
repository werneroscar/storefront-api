import { AuthService } from '../../services/Auth';
const { ADMIN_PASSWORD } = process.env;
import { getInvalidAuthPasswordError } from '../../utils/get-errors';
import { UnauthenticatedError } from '../../errors';

describe('Auth service', () => {
  it('should have an generateToken method', () => {
    //@ts-ignore
    expect(AuthService.generateToken).toBeDefined();
  });

  it('should throw Unauthenticated Error if password is wrong', () => {
    //@ts-ignore
    const error = getInvalidAuthPasswordError(AuthService.generateToken, '1234');
    //@ts-ignore
    expect(error).toEqual(new UnauthenticatedError('Invalid password'));
  });

  it('should NOT throw Unauthenticated Error if password is correct', () => {
    const error = getInvalidAuthPasswordError(
      //@ts-ignore
      AuthService.generateToken,
      ADMIN_PASSWORD as string
    );
    //@ts-ignore
    expect(error).toBeUndefined();
  });

  it('should return token if password is correct', () => {
    //@ts-ignore
    expect(AuthService.generateToken(ADMIN_PASSWORD)).toBeTruthy();
  });
});
