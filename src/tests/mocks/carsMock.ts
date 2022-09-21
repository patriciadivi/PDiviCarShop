import { ICar } from '../../interfaces/ICar';

const carsMock: ICar = 
{
model: "Ferrari Maranello",
year: 1963,
color: "red",
buyValue: 3500000,
seatsQty: 2,
doorsQty: 2
};

const carsMockId: ICar & { _id: string } =
{
_id: '63292b4b07c3886e7174f481',
model: "Ferrari Maranello",
year: 1963,
color: "red",
buyValue: 3500000,
seatsQty: 2,
doorsQty: 2
};

const carsReadCompleted: ICar[] = [
  {
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
  },
  {
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
  }
]

export { carsMock, carsMockId, carsReadCompleted };