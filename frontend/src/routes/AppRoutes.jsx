import {Routes,Route} from 'react-router-dom';

import Layout from '../components/layout/UserLayout';

import HomePage from '../pages/Home';
import SignUp from '../features/auth/pages/Register';
import Login from '../features/auth/pages/Login';
import ProductListning from '../pages/ProductListning';
import ProductDetails from '../pages/ProductDetail';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckOutPage';

const AppRoutes=()=>{
    return(
        <Routes>
            <Route path='/' element={<Layout/>}>

                <Route index element={<HomePage/>} />
                <Route path='/register' element={<SignUp/>} />
                <Route path='/login' element={<Login/>}/>
                <Route path='/products' element={<ProductListning/>} />
                <Route path='/cart' element={<CartPage/>} />
                <Route path='/checkout' element={<CheckoutPage/>} />
                <Route path='/products/:id' element={<ProductDetails/>} />
            </Route>
        </Routes>
    )
}

export default AppRoutes;