import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import AuthContextProvider, { useAuth } from "./context/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Stempling from "./pages/Stempling";
import Lonkort from "./pages/Lonkort";
import Admin from "./pages/Admin";
import CreateCoworker from "./pages/CreateCoworker";
import AdminLonkort from "./pages/AdminLonkort";
import CreateCustomer from "./pages/CreateCustomer";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute user={null}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/createCustomer"
            element={
              <PrivateRoute user={null}>
                <CreateCustomer />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <PrivateRoute user={null}>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route
            path="/createUser"
            element={
              <PrivateRoute user={null}>
                <CreateCoworker />
              </PrivateRoute>
            }
          />
          <Route
            path="/adminlonkort/:id"
            element={
              <PrivateRoute user={null}>
                <AdminLonkort />
              </PrivateRoute>
            }
          />
          <Route
            path="/stempling"
            element={
              <PrivateRoute user={null}>
                <Stempling />
              </PrivateRoute>
            }
          />
          <Route
            path="/lonkort"
            element={
              <PrivateRoute user={null}>
                <Lonkort />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
