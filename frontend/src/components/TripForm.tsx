"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";
import { TripFormProps, TripParams } from "@/types/types";
import { createTrip, updateTrip } from "@/ApiRequests/Trips";
import { popupHelper } from "@/helper/Popup";

export default function TripForm({ initialValues }: TripFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TripParams>({
        defaultValues: {
            title: "",
            destination: "",
            budget: 0,
            days: 0,
        },
    });

    useEffect(() => {
        if (initialValues) {
            reset(initialValues);
        }
    }, [initialValues, reset]);

    const handleFormSubmit = async (data: TripParams) => {
        console.log({ data })
        if (initialValues?.id) {
            data.id = initialValues.id;
            const resp = await updateTrip(data);
            popupHelper({ error: resp.error, message: resp.message });
        } else {
            const resp = await createTrip(data);
            popupHelper({ error: resp.error, message: resp.message });
        }
        reset();
    };

    return (
        <>
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "#f5f5f5",
                    p: 2,
                }}
            >
                <Paper elevation={3} sx={{ p: 4, width: 400, borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom textAlign="center">
                        {initialValues ? "Edit Trip" : "Create Trip"}
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit(handleFormSubmit)}
                        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >

                        <TextField
                            label="Title"
                            {...register("title", { required: "Title is required" })}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                            InputLabelProps={{ shrink: true }}
                        />

                        <TextField
                            label="Destination"
                            {...register("destination", { required: "Destination is required" })}
                            error={!!errors.destination}
                            helperText={errors.destination?.message}
                            InputLabelProps={{ shrink: true }}
                        />

                        <TextField
                            label="Budget"
                            type="number"
                            {...register("budget", {
                                required: "Budget is required",
                                min: { value: 1, message: "Budget must be greater than 0" },
                            })}
                            error={!!errors.budget}
                            helperText={errors.budget?.message}
                        />

                        <TextField
                            label="Days"
                            type="number"
                            {...register("days", {
                                required: "Number of days is required",
                                min: { value: 1, message: "Days must be at least 1" },
                            })}
                            error={!!errors.days}
                            helperText={errors.days?.message}
                        />

                        <Button type="submit" variant="contained" fullWidth>
                            {initialValues ? "Update Trip" : "Create Trip"}
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </>
    );
}
