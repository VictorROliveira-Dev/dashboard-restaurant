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

function App() {
  return (
    <>
      <Router>
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
            path="/products"
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <PrivateRoute>
                <Categories />
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
