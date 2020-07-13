import React from 'react';
import axios from 'axios';
import ProductList from '../components/Index/ProductList'
import baseUrl from '../utils/baseUrl'
import ProductPagination from '../components/Index/ProductPagination'

function Home(products,totalPages) { 

  
  return(
  <>
  <ProductList products={products}/>
    <ProductPagination totalPages={totalPages}/>
    </>
    );
   
}

Home.getInitialProps= async ctx=>{
  console.log(ctx.query);
  const page=ctx.query.page ? ctx.query.page:"1";
  const size=9;
  //fetch data on server
  //return response data as an object
  const url=`${baseUrl}/api/products`;
  const payload={
    params:{page,size}
  }
  const response= await axios.get(url,payload);
//  /console.log(response.data+"response");
  return response.data;

};


export default Home;
