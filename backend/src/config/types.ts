export interface CreateTripRequest {
    Body: {
        title: string,
        destination: string,
        days: number,
        budget: number
    }
}

export interface UpdateTripRequest {
    Params: {
        id: string;
    };
    Body: {
        title?: string;
        destination?: string;
        days?: number;
        budget?: number;
    };
}

export interface GetTripsRequest {
  Querystring: {
    page?: string;
    limit?: string;
    destination?: string;
    minBudget?: string;
    maxBudget?: string;
  };
}

export interface GetTripRequest {
  Params: {
    id: string;
  };
}