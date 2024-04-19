import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import RegisterForm from "./pages/RegisterForm.jsx";
import LoginForm from "./pages/LoginForm.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import Dashboard from "./pages/Dashboard.jsx";
import SharedFiles from "./pages/SharedFiles.jsx";

const queryClient = new QueryClient();

function App() {
    const isAuthenticated = () => {
        return !!localStorage.getItem('token');
    }

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginForm/>} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route
                        path="/dashboard"
                        element={
                            isAuthenticated() ? (
                                <Dashboard />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                    <Route
                        path="/shared"
                        element={
                            isAuthenticated() ? (
                                <SharedFiles />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
