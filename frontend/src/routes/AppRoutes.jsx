import {Routes,Route} from 'react-router-dom';

import Layout from '../components/layout/UserLayout';

import HomePage from '../pages/Home';
import SignUp from '../features/auth/pages/Register';
import ProductsPage from '../pages/ProductPage';

const AppRoutes=()=>{
    return(
        <Routes>
            <Route path='/' element={<Layout/>}>

                <Route index element={<HomePage/>} />
                <Route path='/register' element={<SignUp/>} />
                <Route path='/product' element={<ProductsPage/>} />
            
            </Route>
        </Routes>
    )
}

export default AppRoutes;