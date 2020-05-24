import React from 'react';
import axios from 'axios';
import ProductList from '../components/Index/ProductList'

function Home(products) { 
//console.log(products)
  
  return<ProductList products={products}/>;
}

Home.getInitialProps= async ()=>{
  //fetch data on server
  //return response data as an object
  const url='http://localhost:3000/api/products';
  const response= await axios.get(url);
 // console.log(response.data+"response");
  return{products:response.data};

};


export default Home;
