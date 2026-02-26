import AppRoutes from "./routes/AppRoutes";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

const App=()=>{
  return(
    <>
    <AuthProvider>
    <CartProvider>
    <AppRoutes/>
    </CartProvider>
    </AuthProvider>
    </>
  )
}

export default App;