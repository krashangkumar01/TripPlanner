import mongoose, { Document, Schema } from 'mongoose';

export interface TripPlanInfra extends Document {
    title: string;
    destination: string;
    days: number;
    budget: number;
    createdAt: Date;
}

const TripPlanSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    destination: {
        type: String,
        required: true,
        trim: true,
    },
    days: {
        type: Number,
        required: true,
        min: 1,
    },
    budget: {
        type: Number,
        required: true,
        min: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model<TripPlanInfra>('TripPlan', TripPlanSchema);