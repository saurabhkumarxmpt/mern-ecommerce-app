import {Routes,Route} from 'react-router-dom';

import Layout from '../components/layout/UserLayout';

import HomePage from '../pages/Home';
import SignUp from '../features/auth/pages/Register';

const AppRoutes=()=>{
    return(
        <Routes>
            <Route path='/' element={<Layout/>}>

                <Route index element={<HomePage/>} />
                <Route path='/register' element={<SignUp/>} />
            
            </Route>
        </Routes>
    )
}

export default AppRoutes;