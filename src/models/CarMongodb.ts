import { model as moogoseCreateMode, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongodbModel from './MongodbModel';

const carsMoogoseSchema = new Schema<ICar>({
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  seatsQty: Number,
  doorsQty: Number,
}, {
  versionKey: false,
});

export default class Carsdb extends MongodbModel<ICar> {
  constructor(model = moogoseCreateMode('Cars', carsMoogoseSchema)) {
    super(model);
  }
}