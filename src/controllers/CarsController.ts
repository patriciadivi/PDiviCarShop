import { Request, Response } from 'express';

class CarsController {
  ControllerPostCars = async (_req: Request, res: Response) => 
    // const resultTeamsServiceAll = await TeamsService.ServicePostCars();
    res.status(200).json({ message: 'Successfully created CarsController' })
  ;

  // ControllerTeamsId = async (req: Request, res: Response) => {
  //   const { id } = req.params;
  //   // console.log(req.params);
  //   const resultTeamsServiceId = await TeamsService.ServiceTeamsByAppId(+id);
  //   return res.status(200).json(resultTeamsServiceId);
  // };
}

export default new CarsController();