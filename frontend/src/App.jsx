import AppRoutes from "./routes/AppRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

const App=()=>{
  return(
    <>
    <AuthProvider>
    <CartProvider>
    <AppRoutes/>
    <AdminRoutes/>
    </CartProvider>
    </AuthProvider>
    </>
  )
}

export default App;