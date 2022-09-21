// template para criação dos testes de cobertura da camada de service

import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
// import { ZodError } from 'zod';
import Carsdb from '../../../models/CarMongodb';
import ServicePostCars from '../../../services/ServicePostCars';
import { carsMock, carsMockId, carsReadCompleted } from './../../mocks/carsMock';
import { ICar } from '../../../interfaces';

describe('Model Service', () => {
  const mongodbModel = new Carsdb();
  const servicePostCars = new ServicePostCars(mongodbModel);
  before(async () => {
    sinon.stub(mongodbModel, 'create').resolves(carsMockId);
    sinon.stub(mongodbModel, 'read').resolves(carsReadCompleted)
    sinon.stub(mongodbModel, 'readOne').resolves(carsMockId);
    sinon.stub(mongodbModel, 'update').resolves(carsMockId);
    sinon.stub(mongodbModel, 'delete').resolves(carsMockId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Create Cars', () => {
    it('Case Success', async () => {
      const CarsCreated = await servicePostCars.create(carsMock);

			expect(CarsCreated).to.be.deep.equal(carsMockId);
    });

    it('Success Case, waits for the return within an "NUMBER" 400', async () => {
      const statusCode = 400;
      try {
        await servicePostCars.create({} as ICar);        
      } catch (error: any) {      
        expect(error.status).to.be.equal(statusCode);        
      }
    });

  });

  describe('Read Cars', () => {
    it('Success Case, returning the entire list', async () => {
      const carsReadCompleted = await servicePostCars.read();

      expect(carsReadCompleted).to.be.deep.equal(carsReadCompleted);
    });
    it('Success Case, wait for the return within an "ARRAY"', async () => {
      const carsReadCompleted = await servicePostCars.read();
      
      expect(carsReadCompleted).to.be.an('array');
    });
  });

  describe('ReadOne Cars', () => {
    it('Success Case, waits for the return within an "OBJECT"', async () => {
      const carsReadOneId = '63292b4b07c3886e7174f481'
      const carsReadOne = await servicePostCars.readOne(carsReadOneId);
      expect(carsReadOne).to.be.an('object');
    });

    it('Success Case, expect the return of the "model" key to be "Ferrari Maranello"', async () => {
      const carsReadOneId = '63292b4b07c3886e7174f481'
      const yearMock = carsMockId.model
      const carsReadOne = await servicePostCars.readOne(carsReadOneId);
      expect(carsReadOne?.model).to.be.deep.equal(yearMock);
    });

    it('failure case', async () => {
      try {
        await servicePostCars.readOne('9998');
      } catch (error) {  
        expect(error).to.be.an.instanceOf(Error);
      }
    });
  });

  describe('Update Cars', () => {
    it('Success Case, waits for the return within an "OBJECT"', async () => {
      const carsUpateId = '63292b4b07c3886e7174f481'
      const carsUpate = await servicePostCars.update(carsUpateId, carsMock);
      expect(carsUpate).to.be.an('object');
    });
    
    it('failure case', async () => {
      try {
        await servicePostCars.update('9878', carsMock);
      } catch (error) {  
        expect(error).to.be.an.instanceOf(Error);
      }
    });
  });

  describe('Delete Cars', () => {
    it('Success Case, waits for the return within an "OBJECT"', async () => {
      const carsUpateId = '63292b4b07c3886e7174f481'
      const carsUpate = await servicePostCars.delete(carsUpateId);
      expect(carsUpate).to.be.an('object');
    });
    
    it('failure case', async () => {
      try {
        await servicePostCars.delete('9878');
      } catch (error) {  
        expect(error).to.be.an.instanceOf(Error);
      }
    });
  });
});