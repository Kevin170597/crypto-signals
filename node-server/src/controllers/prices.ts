import { Request, Response } from 'express';
import { getSavedPricesService, udpatePricesService } from '../services/prices';

export const getSavedPrices = async (req: Request, res: Response) => {
    try {
        const response = await getSavedPricesService();
        res.send(response);
    } catch (error) {
        console.log(error);
    }
};

export const updatePrices = async (req: Request, res: Response) => {
    try {
        const response = await udpatePricesService(req.body);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
};