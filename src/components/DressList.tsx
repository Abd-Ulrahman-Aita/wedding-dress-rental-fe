import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDresses } from '../services/api';
import { Box, Button, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';

interface Dress {
    id: string;
    name: string;
    rental_price: number;
    image_url: string;
}

const DressList: React.FC = () => {
    const [dresses, setDresses] = useState<Dress[]>([]);
    const [loading, setLoading] = useState<boolean>(true); 

    useEffect(() => {
        getDresses()
            .then((response) => {
                setDresses(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching dresses:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }} px={3}>
            <h1>Available Wedding Dresses</h1>
            {loading ? ( // Show loader if loading is true
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={3} className="dress-list">
                    {dresses.map((dress) => (
                        <Grid size={{ xs: 12, md: 6, lg: 3 }} key={dress.id}>
                            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <img
                                    src={dress.image_url}
                                    alt={dress.name}
                                    // style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                                    style={{ width: '100%', height: '400px', objectFit: 'fill' }}
                                />
                                <CardContent>
                                    <Typography variant="h6">{dress.name}</Typography>
                                    <Typography variant="body1">${dress.rental_price}</Typography>
                                    {/* <Link to={`/dresses/${dress.id}`}>View Details</Link> */}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component={Link}
                                        to={`/dresses/${dress.id}`}
                                        sx={{ marginTop: '10px' }}>
                                        View Details
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default DressList;