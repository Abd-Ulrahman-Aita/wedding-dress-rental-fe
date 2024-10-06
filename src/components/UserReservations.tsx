import React, { useEffect, useState } from 'react';
import { getUserReservations } from '../services/api';
import { Card, CardContent, Typography, Container, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import dayjs from 'dayjs';

interface Reservation {
    id: string;
    start_date: string;
    end_date: string;
    dress: {
        name: string;
        image_url: string;
        rental_price: number;
    };
}

const UserReservations: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);

    useEffect(() => {
        getUserReservations()
            .then((response) => {
                setReservations(response.data.data); 
            })
            .catch((error) => {
                console.error('Failed to fetch reservations:', error);
            });
    }, []);

    // Function to calculate the total price
    const calculateTotalPrice = (startDate: string, endDate: string, rentalPrice: number) => {
        const start = dayjs(startDate); // Using dayjs for date parsing
        const end = dayjs(endDate);
        const rentalDays = end.diff(start, 'day'); // Calculate the difference in days
        return rentalPrice * rentalDays; 
    };

    return (
        <Container 
            maxWidth="md" 
            style={{ marginTop: '20px' }} 
            className="user-profile">
            <h1>Your Reservations</h1>
            <Grid container spacing={2} direction="row">
                {reservations.length > 0 ? (
                    reservations.map((reservation) => (
                        <Grid size={{ xs:12 }} key={reservation.id}>
                            <Card style={{ display: 'flex', flexDirection: 'row' }}>
                                <Box style={{ flexShrink: 0 }}>
                                    <img 
                                        src={reservation.dress.image_url} 
                                        alt={reservation.dress.name} 
                                        style={{ height: '150px', width: '150px', objectFit: 'fill' }} />
                                </Box>
                                <CardContent style={{ flexGrow: 1 }}>
                                    <Typography variant="h5">{reservation.dress.name}</Typography>
                                    <Typography variant="body2" mt={2}>
                                        Reservation from <b>{reservation.start_date}</b> to <b>{reservation.end_date}</b>
                                    </Typography>
                                    <Typography variant="body2" mt={2}>
                                        Total Price: ${calculateTotalPrice(reservation.start_date, reservation.end_date, reservation.dress.rental_price).toFixed(2)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1">You have no reservations.</Typography>
                )}
            </Grid>
        </Container>
    );
};

export default UserReservations;
