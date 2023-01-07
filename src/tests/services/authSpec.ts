import { AuthService } from '../../services/Auth';
const { ADMIN_PASSWORD } = process.env;
import { getInvalidAuthPasswordError } from '../../utils/get-errors';
import { UnauthenticatedError } from '../../errors';
import { UserStore } from '../../models/User';

const userPassword = 'User@123';

const token = AuthService.generateToken(ADMIN_PASSWORD as string);

import app from '../../server';
import supertest = require('supertest');
const req = supertest(app);

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

describe('Auth middleware should return status 401 if password is token is absent', () => {
  it('when accessing show all users route', async () => {
    const res = await req.get('/users');
    expect(res.statusCode).toEqual(401);
  });

  it('when accessing show user route', async () => {
    const user = await UserStore.create({
      firstName: 'John',
      lastName: 'Waller',
      password: userPassword
    });
    const res = await req.get(`/users/${user.id}`);
    expect(res.statusCode).toEqual(401);
  });

  it('when accessing create user route', async () => {
    const res = await req
      .post('/users')
      .send({ firstName: 'John', lastName: 'Doe', password: userPassword });
    expect(res.statusCode).toEqual(401);
  });
});

describe('Auth middleware should return status 200 if token is present', () => {
  it('when accessing show all users route', async () => {
    const res = await req
      .get('/users')
      .set({ authorization: `Bearer ${token}` });
    expect(res.statusCode).toEqual(200);
  });

  it('when accessing show user route', async () => {
    const user = await UserStore.create({
      firstName: 'Joseph',
      lastName: 'Scott',
      password: userPassword
    });

    const res = await req
      .get(`/users/${user.id}`)
      .set({ authorization: `Bearer ${token}` });
    expect(res.statusCode).toEqual(200);
  });

  it('when accessing create user route', async () => {
    const res = await req
      .post('/users')
      .set({ authorization: `Bearer ${token}` })
      .send({ firstName: 'John', lastName: 'Doe', password: userPassword });
    expect(res.statusCode).toEqual(200);
  });
});
