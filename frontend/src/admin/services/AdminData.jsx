import API from './AdminApi';

export const dashboardData=async()=>{
    const res=await API.get('/dashboard');
    return res.data;
}