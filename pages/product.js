import Axios from "axios";
import ProductSummary from '../components/Product/ProductSummary';
import ProductAttributes from '../components/Product/ProductAttributes';
import baseUrl from '../utils/baseUrl'

function Product({product,user}) {
  console.log(product);
  return <>
  <ProductSummary user={user} {...product}/>
  <ProductAttributes user={user}  {...product}/>
  </>;
}
Product.getInitialProps= async({query:{_id}})=>{
  //console.log(query);
  const url=`${baseUrl}/api/product`;
  const payload={params:{_id }}
const response=await Axios.get(url,payload);
return{product:response.data}

}

export default Product;
