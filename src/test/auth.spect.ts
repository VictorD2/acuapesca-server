// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';
import App from '@src/app';

const app = new App();
const api = request(app.getApi());

describe('POST /api/v1/signin', () => {
  beforeEach(async () => {
    await app.listen();
  });

  test('Correo debe ser enviado', async () => {
    const response = await api.post('/api/v1/auth/signin');
    expect(response.statusCode).toBe(400);
    expect(response.body.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
    expect(response.body.message).toBe("El campo 'email' no tiene un formato adecuado");
  });
  test('Password debe ser enviada', async () => {
    const data = {
      email: 'victor-2027@hotmail.com',
    };
    const response = await api.post('/api/v1/auth/signin').set('Content-Type', 'application/json').send(data);
    expect(response.statusCode).toBe(400);
    expect(response.body.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
    expect(response.body.message).toBe("El campo 'password' debe tener mínimo 8 caracteres");
    return response;
  });

  afterEach(async () => {
    await app.closeApp();
  });
});
