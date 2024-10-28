import "./index.css";
import { Sidebar } from "./components/sidebar/sidebar";
import { CardsDash } from "./components/cards-dash/cards-dash";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Orders } from "./components/orders/orders";
import { Products } from "./components/products/products";
import { Categories } from "./components/categories/categories";
import { Login } from "./components/login/login";
import PrivateRoute from "./components/private-route/private-route";
import { Restaurant } from "./components/restaurant/restaurant";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Router>
        <Toaster />
        <Sidebar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <CardsDash />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          <Route
            path="/produto"
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }
          />
          <Route
            path="/categorias"
            element={
              <PrivateRoute>
                <Categories />
              </PrivateRoute>
            }
          />
          <Route
            path="/restaurant"
            element={
              <PrivateRoute>
                <Restaurant />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
