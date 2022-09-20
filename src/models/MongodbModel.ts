import { Model, isValidObjectId } from 'mongoose';
import { CustomerError } from '../helpers/customerError';
import { IModel } from '../interfaces/IModel';

abstract class MongodbModel<T> implements IModel<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(dataValues: T): Promise<T> {
    const resultCreated = await this.model.create(dataValues);
    return resultCreated;
  }

  async read(): Promise<T[]> {
    const resultList = await this.model.find({});
    return resultList;
  }

  async readOne(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) {
      throw new CustomerError(400, 'Id must have 24 hexadecimal characters');
    }
    const resultItem = await this.model.findById(id);
    return resultItem;
  }

  async update(id: string, dataValues: Partial<T>): Promise<T | null> {  
    if (!isValidObjectId(id)) {
      throw new CustomerError(400, 'Id must have 24 hexadecimal characters');
    } 
    const resultUpdated = await this.model.findByIdAndUpdate(id, dataValues, {
      new: true,
    });
    return resultUpdated;
  }

  async delete(id: string): Promise<T | null> {
    const resultDeleted = await this.model.findByIdAndDelete(id);
    return resultDeleted;
  }
}

export default MongodbModel;