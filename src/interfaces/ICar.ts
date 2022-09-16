import { z } from 'zod';
import { schemaVehicle } from './IVehicle';

const schemaCar = schemaVehicle.extend({
  doorsQty: z.number().int().gte(2).lte(4),
  seatsQty: z.number().int().gte(2).lte(7),
});

type ICar = z.infer<typeof schemaCar >;

export { schemaCar, ICar };