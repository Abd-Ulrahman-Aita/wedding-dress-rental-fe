import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DressDetailPage from './pages/DressDetailPage';
import ReservationPage from './pages/ReservationPage';
import UserAccountPage from './pages/UserAccountPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// import ReservationHistoryPage from './views/ReservationHistoryPage';
import Navbar from './components/Navbar';
import { useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ChangePassword from './components/ChangePassword';

const App: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Router>
            {isAuthenticated && <Navbar />}
            <Routes>
                <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
                <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dresses/:id"
                    element={
                        <ProtectedRoute>
                            <DressDetailPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/reserve/:id"
                    element={
                        <ProtectedRoute>
                            <ReservationPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/account"
                    element={
                        <ProtectedRoute>
                            <UserAccountPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/change-password"
                    element={
                        <ProtectedRoute>
                            <ChangePassword />
                        </ProtectedRoute>
                    }
                />
                {/* <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} /> */}
                {/* <Route path="/dresses/:id" element={isAuthenticated ? <DressDetailPage /> : <Navigate to="/login" />} /> */}
                {/* <Route path="/reserve/:id" element={isAuthenticated ? <ReservationPage /> : <Navigate to="/login" />} /> */}
                {/* <Route path="/account" element={isAuthenticated ? <UserAccountPage /> : <Navigate to="/login" />} /> */}
                {/* <Route path="/reservations" element={<ReservationHistoryPage />} /> */}
                {/* <Route path="*" element={<Navigate to="/" />} /> */}
            </Routes>
        </Router>
    );
};

export default App;
