import {Button,Segement,Divider, Segment} from 'semantic-ui-react'
function CartSummary() {
  return <>
    <Divider/>
    <Segment clearing size="large">
      <strong>Sub Total:</strong>$0.00
      <Button 
      icon="cart"
      color="teal"
      floated="right"
      content="checkout"
      />
    </Segment>

  
 </>
}

export default CartSummary;
