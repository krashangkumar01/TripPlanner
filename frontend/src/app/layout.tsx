import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { CssBaseline, Container } from "@mui/material";

export const metadata: Metadata = {
    title: "Trip Planner",
    description: "Manage and plan your trips",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <CssBaseline />
                <Header />
                <Container sx={{ mt: 4 }}>{children}</Container>
            </body>
        </html>
    );
}
