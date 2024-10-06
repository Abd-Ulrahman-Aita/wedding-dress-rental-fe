import React, { useState } from 'react';
import { register } from '../services/auth';
import { TextField, Button, Container, Box, Typography, Alert, Link as MuiLink, InputAdornment, IconButton } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }
        
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        
        setLoading(true);
        register(name, email, password)
            .then(() => {
                navigate('/login');
            })
            .catch((err: any) => {
                if (err.response && err.response.data && err.response.data.message) {
                    setError(err.response.data.message); // Show backend error message
                } else {
                    setError('Registration failed. Please try again.'); // Fallback for unexpected errors
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev); // Toggle password visibility
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword((prev) => !prev); // Toggle confirm password visibility
    };

    return (
        <Container 
            maxWidth="xs"
            style={{ marginTop: '20px', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
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
                    Register
                </Typography>

                {error && (
                    <Alert severity="error" style={{ marginBottom: '15px' }}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        label="Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        autoComplete="new-name"
                    />
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        autoComplete="new-email"
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
                        autoComplete="new-password"
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
                    <TextField
                        label="Confirm Password"
                        type={showConfirmPassword ? 'text' : 'password'} // Change type based on state
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        autoComplete="new-password"
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />} {/* Toggle icon */}
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
                        {loading ? 'Registering...' : 'Register'}
                    </Button>
                </form>

                <Box mt={2}>
                    <Typography variant="body2">
                        Already have an account?{' '}
                        <MuiLink component={RouterLink} to="/login" underline="hover">
                            Login
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

export default Register;