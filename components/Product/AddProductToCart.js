import {Input,Button,Icon} from 'semantic-ui-react'
function AddProductToCart() {
  return <>
  <Input  focus type="number" placeholder="Quantity" min="1"  value="1"
    action={{
      color:"red",
      content:"Add to cart",
      icon:"plus cart"
    }}
  
  />

  </>;  
}

export default AddProductToCart;
