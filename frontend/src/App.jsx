import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { MovieProvider } from './context/MovieContext';

// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Search from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';

// Admin Pages
import AddMovie from './pages/admin/AddMovie';
import EditMovie from './pages/admin/EditMovies';
import ManageMovies from './pages/admin/ManageMovie';

// Create Material-UI Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {  // Added for ManageMovies title
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#1976d2',
          color: 'white',
          fontWeight: 700,
          fontSize: '1.1rem',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <MovieProvider>
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Admin Routes - Protected */}
              <Route
                path="/admin/manage"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <ManageMovies />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/add-movie"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AddMovie />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/edit-movie/:id"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <EditMovie />
                  </ProtectedRoute>
                }
              />

              {/* Catch all - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </MovieProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;