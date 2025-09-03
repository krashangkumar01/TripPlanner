export type TripParams = {
    id?: string;
    title: string;
    destination: string;
    budget: number;
    days: number;
};

export type GetTripsParams = {
    page?: number;
    limit?: number;
    destination?: string;
    minBudget?: number;
    maxBudget?: number;
}

export type TripFormProps = {
    initialValues?: TripParams;
};


export type Trip = {
    _id: string;
    title: string;
    destination: string;
    budget: number;
    days: number;
};