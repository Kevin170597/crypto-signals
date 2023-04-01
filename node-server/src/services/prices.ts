import { PricesModel } from "../models/prices";

export const getSavedPricesService = async () => {
    const response = await PricesModel.find({});
    return response[0];
};

export const udpatePricesService = async (data: any) => {
    const response = await PricesModel.updateOne({ _id: '64289b0a0a671e2efadab164' }, data);
    return response;
};