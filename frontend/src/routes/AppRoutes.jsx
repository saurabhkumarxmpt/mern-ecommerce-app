import {Routes,Route} from 'react-router-dom';

import Layout from '../components/layout/UserLayout';

import HomePage from '../pages/Home';

const AppRoutes=()=>{
    return(
        <Routes>
            <Route path='/' element={<Layout/>}>

                <Route index element={<HomePage/>} />
            
            </Route>
        </Routes>
    )
}

export default AppRoutes;