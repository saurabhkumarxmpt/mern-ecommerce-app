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

