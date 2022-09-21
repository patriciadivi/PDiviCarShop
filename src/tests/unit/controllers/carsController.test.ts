// template para criação dos testes de cobertura da camada de controller


import * as sinon from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';
import Carsdb from '../../../models/CarMongodb';
import ServicePostCars from '../../../services/ServicePostCars';
import CarsController from '../../../controllers/CarsController';
import { carsMock, carsMockId, carsReadCompleted } from './../../mocks/carsMock';
const { expect } = chai;

describe('Controllers layer', () => {
  const mongodbModel = new Carsdb();
  const servicePostCars = new ServicePostCars(mongodbModel);
  const carsController = new CarsController(servicePostCars)

  const req = {} as Request;
  const res = {} as Response;

  before(async () => {
    sinon.stub(servicePostCars, 'create').resolves(carsMock);
    sinon.stub(servicePostCars, 'read').resolves(carsReadCompleted);
    sinon.stub(servicePostCars, 'readOne').resolves(carsMockId);
    sinon.stub(servicePostCars, 'update').resolves(carsMockId);
    sinon.stub(servicePostCars, 'delete').resolves(carsMockId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Create Cars', () => {

    it('Case Success', async () => {
      req.params = { id: carsMockId._id }
    await carsController.create(req, res);
      
    expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith(carsMock)).to.be.true;
    });
    
  });

  describe('Read Cars', () => {
    
    it('Case Success', async () => {
      await carsController.read(req, res);
      
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsReadCompleted)).to.be.true;
    });
    
  });

  describe('ReadOne Cars', () => {
    
    it('Case Success', async () => {
      req.params = { id: carsMockId._id };
      await carsController.readOne(req, res);
      
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsMockId)).to.be.true;
    });
    
  });

  describe('Upate Cars', () => {
    
    it('Case Success', async () => {
      req.params = { id: carsMockId._id };
      await carsController.update(req, res);
      
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsMockId)).to.be.true;
    });
    
  });

  describe('Delete Cars', () => {
    
    it('Case Success', async () => {
      req.params = { id: carsMockId._id };
      await carsController.delete(req, res);
      
      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsMockId)).to.be.true;
    });
    
  });

  // describe('Controllers layer', () => {
  //   it('', async () => {});

  // });

});