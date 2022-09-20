import { isValidObjectId } from 'mongoose';
import { CustomerError } from '../helpers/customerError';
import { ICar, IModel, schemaCar } from '../interfaces/index';

class ServicePostCars implements IModel<ICar> {
  private modelCompleteCar: IModel<ICar>;

  constructor(modelCompleteCar: IModel<ICar>) {
    this.modelCompleteCar = modelCompleteCar;
  }

  public create = async (createParamsObj: ICar): Promise<ICar> => {
    const resultCreated = schemaCar.safeParse(createParamsObj);
    if (!resultCreated.success) throw new CustomerError(400, 'Invalid fields');
    return this.modelCompleteCar.create(createParamsObj);
  };

  public read = async (): Promise<ICar[]> => {
    const resultList = await this.modelCompleteCar.read();
    return resultList;
  };

  public readOne = async (id: string): Promise<ICar | null> => {
    const resulItemOne = await this.modelCompleteCar.readOne(id);

    return resulItemOne;
  };
  
  public update = async (id: string, carParams: ICar): Promise<ICar | null> => {
    if (!isValidObjectId(id)) {
      throw new CustomerError(400, 'Id must have 24 hexadecimal characters');
    }
    const resultSafeParse = schemaCar.safeParse(carParams);

    if (!resultSafeParse.success) throw new CustomerError(400, 'Bad request');

    const resultUpdated = await this.modelCompleteCar.update(id, carParams);

    if (!resultUpdated) throw new CustomerError(404, 'Object not found');
    return resultUpdated;
  };

  public async delete(id: string): Promise<ICar | null> {
    if (!isValidObjectId(id)) {
      throw new CustomerError(400, 'Id must have 24 hexadecimal characters');
    }
    const resultDeleted = await this.modelCompleteCar.delete(id);
    if (!resultDeleted) throw new CustomerError(404, 'Object not found');
    
    return resultDeleted;
  }
}

export default ServicePostCars;