import {Card} from 'semantic-ui-react';
function ProductList({products}) {
  console.log(products)
  function mapProductToItems(products) {
    console.log(products.products)
      return products.products.map(product=>({
             header:product.name,
       image:product.mediaUrl,
       meta:`$${product.price}`,
       color:'teal',
       fluid:true,
       childKey:product._id,
       href:`/product?_id=${product._id}`

      }))
   }
  return <Card.Group stackable itemsPerRow ="3" centered items={mapProductToItems(products)}/>;
}

export default ProductList;
 