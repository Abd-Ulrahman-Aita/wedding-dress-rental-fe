import React, { useState } from 'react';
import { login as loginService } from '../services/auth';
import { TextField, Button, Container, Box, Typography, Alert, Link as MuiLink, IconButton, InputAdornment } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); 

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        loginService(email, password)
            .then(async (response) => {
                const token = response.data.token;
                const user = response.data.user;
                await login(token, user);
                navigate('/');
            })
            .catch((err: any) => {
                if (err.response && err.response.data && err.response.data.message) {
                    setError(err.response.data.message); // Show backend error message
                } else {
                    setError('Login failed, please try again.'); 
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev); // Toggle password visibility
    };

    return (
        <Container 
            maxWidth="xs"
            style={{ marginTop: '20px', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="50vh"
                padding={3}
                boxShadow={3}
                borderRadius={2}
                bgcolor="background.paper"
                zIndex={1}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>

                {error && (
                    <Alert severity="error" style={{ marginBottom: '15px' }}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Password"
                        // type="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleClickShowPassword} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />} {/* Toggle icon */}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '20px' }}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
                <Box mt={2}>
                    <Typography variant="body2">
                        Don't have an account?{' '}
                        <MuiLink component={RouterLink} to="/register" underline="hover">
                            Register now
                        </MuiLink>
                    </Typography>
                </Box>
            </Box>
            <div 
                className="background-image"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'url("https://s.alicdn.com/@sc04/kf/HTB1dTrGel1D3KVjSZFy762uFpXa7.png_720x720q50.jpg")',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    filter: 'blur(4px)',
                    zIndex: 0
                }} />
        </Container>
    );
};

export default Login;