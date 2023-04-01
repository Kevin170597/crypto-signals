import { Schema, model } from 'mongoose';

interface Price {
    _id?: string,
    currency: string,
    active: boolean,
    buy: number,
    sell: number
};

const PricesSchema = new Schema<Price>(
    {
        currency: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            required: true
        },
        buy: {
            type: Number,
            required: true
        },
        sell: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const PricesModel = model('prices', PricesSchema);