"use client";
import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    TextField,
    Box,
    Typography,
    IconButton,
} from "@mui/material";
import { Trip } from "@/types/types";
import { getTrips } from "@/ApiRequests/Trips";
import EditIcon from "@mui/icons-material/Edit";
import { popupHelper } from "@/helper/Popup";
import { useRouter } from "next/navigation";



export default function TripTable() {
    const router = useRouter();
    const [trips, setTrips] = useState<Trip[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [destinationFilter, setDestinationFilter] = useState("");
    const [minBudget, setMinBudget] = useState<number | "">("");
    const [maxBudget, setMaxBudget] = useState<number | "">("");

    const fetchTrips = async () => {
        try {
            const resp = await getTrips({
                page: page + 1,
                limit: rowsPerPage,
                destination: destinationFilter || undefined,
                minBudget: minBudget !== "" ? minBudget : undefined,
                maxBudget: maxBudget !== "" ? maxBudget : undefined,
            })
            if(resp.error)
                popupHelper({error: resp.error, message: resp.message})
            setTrips(resp?.trips);
            setTotal(resp?.total);
        } catch (error) {
            console.error("Error fetching trips:", error);
        }
    };

    useEffect(() => {
        fetchTrips();
    }, [page, rowsPerPage, destinationFilter, minBudget, maxBudget]);

    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Trips
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                    label="Destination"
                    variant="outlined"
                    size="small"
                    value={destinationFilter}
                    onChange={(e) => {
                        setDestinationFilter(e.target.value);
                        setPage(0);
                    }}
                />
                <TextField
                    label="Min Budget"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={minBudget}
                    onChange={(e) => {
                        setMinBudget(e.target.value ? Number(e.target.value) : "");
                        setPage(0);
                    }}
                />
                <TextField
                    label="Max Budget"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={maxBudget}
                    onChange={(e) => {
                        setMaxBudget(e.target.value ? Number(e.target.value) : "");
                        setPage(0);
                    }}
                />
            </Box>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Destination</TableCell>
                            <TableCell>Budget</TableCell>
                            <TableCell>Days</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {trips?.map((trip) => (
                            <TableRow key={trip._id}>
                                <TableCell>{trip.title}</TableCell>
                                <TableCell>{trip.destination}</TableCell>
                                <TableCell>{trip.budget}</TableCell>
                                <TableCell>{trip.days}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        color="primary"
                                        onClick={() => router.push(`/edit/${trip._id}`)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {trips.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No trips found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={total}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0);
                }}
            />
        </Paper>
    );
}
