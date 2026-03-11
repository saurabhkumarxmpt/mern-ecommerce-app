import {Routes,Route} from 'react-router-dom';
import { Toaster } from "react-hot-toast";

import WelcomePage from "../admin/pages/WelcomePage";
import Login from "../admin/auth/Login";

const AdminRoutes=()=>{
    return(
        <>
        <Toaster position='top-right' reverseOrder={false} />
        <Routes>
            <Route path='/admin' element={<WelcomePage/>}>

                <Route path='/login' element={<Login/>} />
            </Route>
        </Routes>
        </>
    )
}

export default AdminRoutes;