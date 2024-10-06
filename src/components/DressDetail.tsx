import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDressDetail } from '../services/api';
import { Card, CardMedia, CardContent, Typography, Button, Container, CircularProgress} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';

interface Dress {
    id: string;
    name: string;
    description: string;
    rental_price: number;
    sizes: string[];
    image_url: string;
}

const DressDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [dress, setDress] = useState<Dress | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    
    const navigate = useNavigate();

    useEffect(() => {
        getDressDetail(id!).then((response) => {
            const dressData = response.data.data;
            // Parse sizes if it's a string representation of an array
            if (typeof dressData.sizes === 'string') {
                dressData.sizes = JSON.parse(dressData.sizes);
            }
            setDress(dressData);
        }).catch((error) => {
            console.error('Error fetching dress details:', error);
        }).finally(() => {
            setLoading(false);
        });
    }, [id]);

    return (
        <Container 
            maxWidth="md" 
            style={{ marginTop: '20px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
            {loading ? ( // Show loader if loading is true
                <CircularProgress />
            ) : (
                dress && (
                    <Card>
                        <Grid container>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <CardMedia
                                    component="img"
                                    height="400"
                                    image={dress.image_url}
                                    alt={dress.name}
                                    // style={{ objectFit: 'cover' }} // Keeps the aspect ratio
                                    style={{ objectFit: 'fill' }} 
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <CardContent>
                                    <Typography variant="h4" component="div" gutterBottom>
                                        {dress.name}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {dress.description}
                                    </Typography>
                                    <Typography variant="h6" color="text.primary" style={{ marginTop: '10px' }}>
                                        Rental Price: ${dress.rental_price}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" style={{ marginTop: '10px' }}>
                                        Sizes available: {dress.sizes.join(', ')}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ marginTop: '20px' }}
                                        // href={`/reserve/${dress.id}`}
                                        onClick={() => navigate(`/reserve/${dress.id}`)}>
                                        Reserve Now
                                    </Button>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Card>
                )
            )}
        </Container>
    );
};

export default DressDetail;
