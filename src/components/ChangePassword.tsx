import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Alert, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { changePassword as changePasswordService } from '../services/auth'; // Import the service to call API
import { useNavigate } from 'react-router-dom';

const ChangePassword: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (newPassword.length < 8) {
            setError("New password must be at least 8 characters long.");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setError("New password and confirm password do not match.");
            return;
        }

        setLoading(true);

        changePasswordService({ current_password: currentPassword, new_password: newPassword })
            .then(() => {
                setSuccess("Password changed successfully.");
                setCurrentPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
            })
            .catch((err: any) => {
                if (err.response && err.response.data && err.response.data.message) {
                    setError(err.response.data.message); // Show backend error message
                } else {
                    setError("Failed to change password. Please try again.");
                }
            })
            .finally(() => {
                setLoading(false);
            });
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
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Change Password
                </Typography>

                {error && (
                    <Alert severity="error" style={{ marginBottom: '15px' }}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" style={{ marginBottom: '15px' }}>
                        {success}
                    </Alert>
                )}

                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        label="Current Password"
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        autoComplete="new-password"
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowCurrentPassword(!showCurrentPassword)} edge="end">
                                            {showCurrentPassword ? <VisibilityOff /> : <Visibility />} {/* Toggle icon */}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    <TextField
                        label="New Password"
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        autoComplete="new-password"
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                                            {showNewPassword ? <VisibilityOff /> : <Visibility />} {/* Toggle icon */}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    <TextField
                        label="Confirm New Password"
                        type={showConfirmNewPassword ? 'text' : 'password'}
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)} edge="end">
                                            {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />} {/* Toggle icon */}
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
                        disabled={loading}
                    >
                        {loading ? 'Changing...' : 'Change Password'}
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default ChangePassword;
