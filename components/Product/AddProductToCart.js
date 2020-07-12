import react, { useState } from 'react';
import {useRouter} from 'next/router'
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import {Input,Button,Icon} from 'semantic-ui-react'
import cookies from 'js-cookie';
import catchErrors from '../../utils/catchErrors';
function AddProductToCart({user,productId}) {
  const [quantity,setQuamtity]=React.useState(1);
  const [loading,setLoading]=React.useState(false);
  const [success,setSuccess]=React.useState(false);
  const router=useRouter();
  React.useEffect(()=>{
    let timeout;
    if(success)
    {
      timeout=setTimeout(()=>setSuccess(false),3000);
    }
    return ()=>{
          clearTimeout(timeout)
    }

  },[success])
  async function handleAddProductToCart() {
    try {
      setLoading(true);
      const url =`${baseUrl}/api/cart`;
      const payload = {quantity,productId};

      const token = cookies.get('token');
      const headers = {headers:{Authorization:token}};

      await axios.put(url,payload,headers);
      setSuccess(true);
    } catch (error) {
      catchErrors(error,window.alert);
    }
    finally{
      setLoading(false);
    }
  }

  return <>
  <Input  focus type="number" placeholder="Quantity" min="1"  value={quantity}
       onChange={event=>setQuamtity(Number(event.target.value))}
    action={
      user && success?{
        color:'blue',
        content:"item added",
        icon:"plus cart",
        disabled:true

      }:
      user ?{
      color:"red",
      content:"Add to cart",
      icon:"plus cart",
      loading,
      disabled:loading,
      onClick: handleAddProductToCart

    }:{
      color:"blue",
      content:"Sign up tu purschase",
      icon:"Sign up",
      onClick:()=> router.push('/signUp')
    }}
  
  />

  </>;  
}

export default AddProductToCart;
