import {Outlet} from 'react-router-dom';
const WelcomePage=()=>{
    return(
        <>
        <h1>welcome to admin section</h1>
        <Outlet/>
        </>
    )
}

export default WelcomePage;