/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanesa a la napolitana',
  summary: 'Soy summary',
  healthScore: 30,
  steps: 'Soy steps',
  diets: ['vegan']
};
const recipe2 = {
  name: 'Milanesa a la napolitana',
  summary: 'Soy summary',
  healthScore: 30,
  steps: 'Soy steps',
};
const recipe3 = {
  name: 'Milanesa a la napolitana',
  summary: 'Soy summary',
  healthScore: 300,
  steps: 'Soy steps',
  diets: ['vegan']
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('POST /api/recipes', () => {
    it('should get 200', () =>
      agent.post('/api/recipes')
      .send(recipe)
      .then((res)=>{
        expect(200)
      })
    );
    it('should get 404', () =>
      agent.post('/api/recipes')
      .send(recipe2)
      .then((res)=>{
        expect(404)
      })
    );
    it('should get 404', () =>
    agent.post('/api/recipes')
    .send(recipe2)
    .then((res)=>{
      expect(res.body.msg).equal('There is some missing data to create your Recipe')
    })
    );
    it('should get 404', () =>
      agent.post('/api/recipes')
      .send(recipe3)
      .then((res)=>{
        expect(res.body.msg).equal('The Health Score must be a number between 1 and 100')
      })
    );
  });

  describe('GET /api/recipes', () => {
    it('should get 200', () =>
      agent.get('/api/recipes')
      .send()
      .then((res)=>{
        expect(200)
      })
    );
    it('should get 404', () =>
      agent.get('/api/recipes')
      .send('hola')
      .then((res)=>{
        expect(404)
      })
    );
    it('should get 404', () =>
    agent.get('/api/recipes')
    .send('perro')
    .then((res)=>{
      expect(res.body.msg).equal('Recipe not found')
    })
    );
  });
});
