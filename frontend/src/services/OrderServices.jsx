import API from "./Api";

export  const createOrder=async(orderData,token)=>{
    const {data}=await API.post(
        '/orders',
        orderData,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );

    return data;
}

export const getMyOrders=async () =>{
    const token = localStorage.getItem("token");

    const res=await API.get('/orders/my-orders',{
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;

}


export const getAllOrders=async()=>{
    const res=await API.get('/orders/all-orders');
    return res.data;
}

export const getTodayOrdres=async()=>{
    const res=await API.get('/orders/today');
    return res.data;
}

export const updateOrderStatus = async (id,data) => {

    const res=await API.put(`/orders/update/${id}`,data);
    return res.data;
}