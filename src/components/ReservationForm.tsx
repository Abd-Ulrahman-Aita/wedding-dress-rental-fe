import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { reserveDress } from '../services/api';
import { TextField, Button, Box, Typography, Container, Alert } from '@mui/material';

const ReservationForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        reserveDress({ dress_id: id!, start_date: startDate, end_date: endDate })
            .then(() => {
                alert('Dress reserved successfully!');
                navigate('/');
            })
            .catch(() => {
                setError('Reservation failed. Please try again.');
            });
    };

    return (
        <Container 
            maxWidth="sm"
            style={{ marginTop: '20px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="50vh"
                boxShadow={3}
                borderRadius={2}
                padding={3}
                bgcolor="background.paper">
                <Typography variant="h5" component="h1" gutterBottom>
                    Reserve Dress
                </Typography>

                {error && (
                    <Alert severity="error" style={{ marginBottom: '15px' }}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        label="Start Date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label="End Date"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '20px' }}
                    >
                        Reserve
                    </Button>
                    <Link 
                        to={`/dresses/${id}`}
                        style={{ marginTop: '20px', display:'flex', justifyContent: 'center' }}>
                            Back to Dress Details
                    </Link>
                </form>
            </Box>
        </Container>
    );
};

export default ReservationForm;