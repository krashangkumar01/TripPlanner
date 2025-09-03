import { getTrips } from '@/ApiRequests/Trips';
import { Trip } from '@/types/types';
import { Box, Button, Pagination, TextField, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import TripCard from './TripCard';

function TripList() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);

    const [destination, setDestination] = useState("");
    const [minBudget, setMinBudget] = useState("");
    const [maxBudget, setMaxBudget] = useState("");

    const fetchTrips = async () => {
        const params = {
            page,
            limit: 6,
            destination: destination || undefined,
            minBudget: minBudget !== "" ? Number(minBudget) : undefined,
            maxBudget: maxBudget !== "" ? Number(maxBudget) : undefined,
        };

        const resp = await getTrips(params);
        if (!resp.error) {
            setTrips(resp.trips);
            setTotalPages(resp.totalPages || 1);
        }
    };

    useEffect(() => {
        fetchTrips();
    }, [page]);


    const handleFilter = () => {
        setPage(1);
        fetchTrips();
    };

    return (
        <Box>
            <Box
                display="flex"
                gap={2}
                mb={3}
                alignItems="center"
                flexWrap="wrap"
            >
                <TextField
                    label="Destination"
                    size="small"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />
                <TextField
                    label="Min Budget"
                    size="small"
                    type="number"
                    value={minBudget}
                    onChange={(e) => setMinBudget(e.target.value)}
                />
                <TextField
                    label="Max Budget"
                    size="small"
                    type="number"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                />
                <Button
                    variant="contained"
                    onClick={handleFilter}
                >
                    Apply Filters
                </Button>
            </Box>

            <Box
                display="grid"
                gridTemplateColumns="repeat(3, 1fr)"
                gap={3}
            >
                {trips.length > 0 ? (
                    trips.map((trip) => (
                        <TripCard key={trip._id} trip={trip} />
                    ))
                ) : (
                    <Box p={4} textAlign="center" gridColumn="span 3">
                        No trips found
                    </Box>
                )}
            </Box>


            <Box display="flex" justifyContent="center" mt={3}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_, val) => setPage(val)}
                    color="primary"
                />
            </Box>
        </Box>
    );
}

export default TripList