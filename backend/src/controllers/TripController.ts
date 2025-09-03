import { FastifyReply, FastifyRequest } from "fastify";
import { CreateTripRequest, GetTripsRequest, UpdateTripRequest } from "../config/types";
import { z } from 'zod';
import TripPlan from "../models/TripPlan";

const createTripSchema = z.object({
  title: z.string().min(1),
  destination: z.string().min(1),
  days: z.number().min(1),
  budget: z.number().min(0),
});

const updateTripSchema = createTripSchema.partial();

const paramIdSchema = z.object({
    id: z.string().length(24)
})



export const createTrip = async (req: FastifyRequest<CreateTripRequest>, res: FastifyReply) => {
    const result: { error: boolean; message: string; } = { error: false, message: "ok" };
    try {
        const validateData = createTripSchema.parse(req.body);
        const trip = new TripPlan(validateData);
        await trip.save();
        result.message = "Trip Saved Successfully";
        return res.status(200).send(result);
    } catch (err) {
        console.log({err})
        result.error = true;
        result.message = (err as any).message;
        if (err instanceof z.ZodError)
            return res.status(400).send(result);
        return res.status(500).send(result);
    }
}

export const updateTrip = async (req: FastifyRequest<UpdateTripRequest>, res: FastifyReply) => {
    const result: { error: boolean; message: string; } = { error: false, message: "ok" };
    try {
        const {id} = paramIdSchema.parse(req.params);
        const data = updateTripSchema.parse(req.body);
        const updatedTrip = await TripPlan.findByIdAndUpdate(id, data);
        if (!updatedTrip) {
            result.error = true;
            result.message = "Trip not found";
            return res.status(400).send(result);
        }
        result.message = "Trip Updated successfully";
        return res.status(200).send(result);
    } catch (err) {
        console.log({ err });
        result.error = true;
        result.message = (err as any).message;
        if (err instanceof z.ZodError)
            return res.status(400).send(result);
        return res.status(500).send(result);
    }
}

export const getTrips = async (req: FastifyRequest<GetTripsRequest>, res: FastifyReply) => {
    const result: { error: boolean; message: string; trips: any[], total: number } = { error: false, message: 'ok', trips: [], total: 0 };
    try {
        const { page='1', limit='10', destination, minBudget, maxBudget } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const filter:any = {};
        if (destination) 
            filter.destination = { $regex: destination, $options: 'i' };
        if (minBudget || maxBudget) {
            filter.budget = {};
            if (minBudget)
                filter.budget.$gte = Number(minBudget)
            if (maxBudget)
                filter.budget.$lte = Number(maxBudget)
        }
        const trips = await TripPlan.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit));
        const total = await TripPlan.countDocuments(filter);
        result.trips = trips;
        result.total = total;
        result.message = trips?.length ? 'Trips list found' : 'No Trip found';
        return res.status(200).send(result);
    } catch (err) {
        console.log({err})
        result.error = true;
        result.message = (err as any).message;
        if (err instanceof z.ZodError)
            return res.status(400).send(result);
        return res.status(500).send(result);
    }
}

export const getTrip = async (req: FastifyRequest<GetTripsRequest>, res: FastifyReply) => {
    const result: { error: boolean, message: string, trip: object } = { error: false, message: "ok", trip: {} };
    try {
        const {id} = paramIdSchema.parse(req.params);
        const trip = await TripPlan.findById(id);
        if (!trip) {
            result.error = true;
            result.message = "Trip not found";
            return res.status(404).send(result);
        }
        result.trip = trip;
        result.message = "Trip found";
        return res.status(200).send(result);
    } catch (err) {
        console.log({ err })
        result.error = true;
        result.message = (err as any).message;
        if (err instanceof z.ZodError)
            return res.status(400).send(result);
        return res.status(500).send(result);
    }
}