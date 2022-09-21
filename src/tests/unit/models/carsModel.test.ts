// template para criação dos testes de cobertura da camada de model


import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import Carsdb from '../../../models/CarMongodb';
import { carsMock, carsMockId, carsReadCompleted } from './../../mocks/carsMock';
const { expect } = chai;

describe('ModelMongodb layer', () => {
  const mongodbModel = new Carsdb();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carsMock);
    sinon.stub(Model, 'find').resolves(carsReadCompleted);
    sinon.stub(Model, 'findById').resolves(carsMockId);
    // sinon.stub(Model, 'findOne').resolves(carsObjOutput);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carsMockId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(carsMockId);
    
  });

  after(()=>{
    sinon.restore();
  })

  describe('Create Cars', () => {
    it('Case Success', async () => {
      const CarsCreated = await mongodbModel.create(carsMock);

			expect(CarsCreated).to.be.an('object');
    });
  });

  describe('Read Cars', () => {
    it('Case Success', async () => {
      const CarsCreated = await mongodbModel.read();

			expect(CarsCreated).to.be.an('array');
    });
  });

  describe('ReadOne Cars', () => {
    it('Case Success', async () => {
      const carsReadOneId = '63292b4b07c3886e7174f481'
      const CarsCreated = await mongodbModel.readOne(carsReadOneId);

			expect(CarsCreated).to.be.an('object');
    });

    it('Wait for it to return the message "Id must have 24 hexadecimal characters"', async () => {
      try {
        await mongodbModel.readOne('632231a9c9854785577da8048');
      } catch (error: any) {
        console.log(error.message, '<<<<<');
        
        expect(error.message).to.be.equal('Id must have 24 hexadecimal characters')
      }
    });
  });

  describe('Update Cars', () => {
    it('Case Success', async () => {
      const CarsCreated = await mongodbModel.update(carsMockId._id, carsMock);

			expect(CarsCreated).to.be.an('object');
    });

    it('Wait for it to return the message "Id must have 24 hexadecimal characters"', async () => {
      try {
        await mongodbModel.update('632231a9c9854785577da8048', carsMock);
      } catch (error: any) {
        console.log(error.message, '<<<<<');
        
        expect(error.message).to.be.equal('Id must have 24 hexadecimal characters')
      }
    });
  });

  describe('Update Cars', () => {
    it('Case Success', async () => {
      const CarsCreated = await mongodbModel.delete(carsMockId._id);

			// expect(CarsCreated).to.be.an('object');
      expect(CarsCreated).to.be.deep.equal(carsMockId);
    });
  });


});
