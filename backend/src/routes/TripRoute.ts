import { FastifyInstance } from "fastify";
import { createTrip, getTrip, getTrips, updateTrip } from "../controllers/TripController";

export default async function tripRoutes(fastify:FastifyInstance) {
    fastify.post('/', createTrip);
    fastify.put("/:id", updateTrip);
    fastify.get("/", getTrips);
    fastify.get("/:id", getTrip);
}
