"use client";
import React from "react";
import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
} from "@mui/material";
import { Trip } from "@/types/types";
import Link from "next/link";

interface TripCardProps {
    trip: Trip;
}

export default function TripCard({ trip }: TripCardProps) {
    return (
        <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {trip.title}
                </Typography>
                <Typography color="text.secondary">Destination: {trip.destination}</Typography>
                <Typography color="text.secondary">Budget: ₹{trip.budget}</Typography>
                <Typography color="text.secondary">Days: {trip.days}</Typography>
            </CardContent>
            <CardActions>
                <Button
                    component={Link}
                    href={`/edit/${trip._id}`}
                    size="small"
                    variant="outlined"
                >
                    Edit
                </Button>

            </CardActions>
        </Card>
    );
}
