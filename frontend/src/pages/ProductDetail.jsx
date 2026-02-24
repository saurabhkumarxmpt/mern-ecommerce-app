import {useParams} from 'react-router-dom';
import {useEffect,useState} from 'react';
import {GetSingleProduct} from '../services/ProductServices';

const ProductDetails=()=>{

    const[product,setProduct]=useState([]);


    useEffect(()=>{
        const fetchProduct=async()=>{
            const res=await GetSingleProduct();
            setProduct(res);
        }
        fetchProduct();
    },[]);

    console.log(product);

    return(
        <>
        
        
        </>
    )
}


export default ProductDetails;