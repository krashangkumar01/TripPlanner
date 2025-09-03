import { GetTripsParams, TripParams } from "@/types/types";
import axios from "axios";
import { ApiError } from "next/dist/server/api-utils";
const URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/trips`;

const handleError = (error: unknown, defaultMessage: string) => {
  console.log("API Error:", error);
  const apiError = error as ApiError;
  if (apiError?.message) {
    return { error: true, message: apiError?.message };
  }
  return { error: true, message: defaultMessage };
};

export const createTrip = async ({ title, destination, budget, days }: TripParams) => {
	try {
        const { data } = await axios.post(URL, { title, destination, budget: Number(budget), days: Number(days) });
        return data;
    } catch (error) {
        handleError(error, "Error in create trip")
    }
}

export const updateTrip = async ({ id, title, destination, budget, days }: TripParams) => {
    try {
        const updatedData: { [key: string]: unknown } = {};
        if (title)
            updatedData.title = title;
        if (destination)
            updatedData.destination = destination;
        if (budget)
            updatedData.budget = Number(budget)
        if (days)
            updatedData.days = Number(days)
        
        const { data } = await axios.put(`${URL}/${id}`, updatedData);
        return data;
    } catch (error) {
        handleError(error, "Error in update trip");
    }
}

export const getTrips = async ({ page, limit, destination, minBudget, maxBudget }: GetTripsParams) => {
  try {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (limit) params.append("limit", String(limit));
    if (destination) params.append("destination", destination);
    if (minBudget) params.append("minBudget", String(minBudget));
    if (maxBudget) params.append("maxBudget", String(maxBudget));

    const { data } = await axios.get(`${URL}?${params.toString()}`);
    return data;
  } catch (error) {
    handleError(error, "Error in get trips");
  }
};


export const getTrip = async ({ id }: { id: string }) => {
    try {
        const { data } = await axios.get(`${URL}/${id}`);
        return data;
    } catch (error) {
        handleError(error, "Error in get trip");
    }
}