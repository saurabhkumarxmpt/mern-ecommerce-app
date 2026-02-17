import {Routes,Route} from 'react-router-dom';

import Layout from '../components/layout/UserLayout';

import HomePage from '../pages/Home';
import SignUp from '../features/auth/pages/Register';
import ProductListning from '../pages/ProductListning';

const AppRoutes=()=>{
    return(
        <Routes>
            <Route path='/' element={<Layout/>}>

                <Route index element={<HomePage/>} />
                <Route path='/register' element={<SignUp/>} />
                <Route path='/products' element={<ProductListning/>} />
            </Route>
        </Routes>
    )
}

export default AppRoutes;