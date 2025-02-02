import { Router, Request, Response } from "express";
import { tipOfTheDay } from "../services/ai.service";

const aiRoutes: Router = Router();

aiRoutes.get('/tipOfTheDay', async (req: Request, res: Response) => {
  const tip = await tipOfTheDay();
  res.status(200).send(tip);
});

export default aiRoutes;