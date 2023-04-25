const { requestLogger, unknownEndpoint, errorHandler } = require('../utils/middleware');
const express = require('express');
const httpMocks = require('node-mocks-http');
const supertest = require('supertest');
const http = require('http');
const logger = require('../utils/logger');

describe('middleware', () => {
  let app;
  let server;

  afterEach(() => {
    if (server) {
      server.close();
    }
  });

  test('requestLogger logs the request', async () => {
    const logSpy = jest.spyOn(logger, 'info');
    app = express();
    app.use(express.json());
    app.use(requestLogger);

    app.get('/test', (req, res) => {
      res.status(200).send('OK');
    });

    server = http.createServer(app);
    const request = supertest(server);
    const response = await request.get('/test');

    expect(logSpy).toHaveBeenCalledWith('Method:', 'GET');
    expect(logSpy).toHaveBeenCalledWith('Path:  ', '/test');
    expect(logSpy).toHaveBeenCalledWith('Body:  ', {});
    expect(logSpy).toHaveBeenCalledWith('---');
    logSpy.mockRestore();
  });
      
  test('unknownEndpoint sends a 404 with an error message', async () => {
    app = express();
    app.use(unknownEndpoint);

    server = http.createServer(app);

    const request = supertest(server);
    const response = await request.get('/nonexistent');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'unknown endpoint' });
  });

  test('errorHandler handles different error types', async () => {
    const error = {
      name: 'ValidationError',
      message: 'Test error message',
    };
  
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();
  
    errorHandler(error, req, res, next);
  
    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({ error: error.message });
  });  
});
