 import React from 'react'
 import Axios from 'axios'
 import {Header, Button,Modal, ModalActions} from 'semantic-ui-react'
 import baseUrl from '../../utils/baseUrl'
import { Model, model } from 'mongoose'
import {userRouter, useRouter} from 'next/router'
 function ProductAttributes({description,_id}) {
  const router=useRouter()
  const [modal,setModal] = React.useState(false)
  async function handleDelete()
  {
    const url=`${baseUrl}/api/product`;
    const payload={params:{_id}}
    await Axios.delete(url,payload);
    router.push('/')

    
  }
  return <>
  <Header as="h3" >About this Poduct</Header>
  <p>{description}</p>
  <Button
  icon ="trash alternate outline"
  color="red"
  content="Delete Product"
  onClick={()=>setModal(true)}
  />
  <Modal open={modal} dimmer={true}>
    <Modal.Header>Confirm Delete</Modal.Header>
    <Modal.Content>
      <p>Are you sure you want to delete this product</p>
    </Modal.Content>
    <Modal.Actions>
      <Button content="Cancel" 
      onClick={()=>setModal(false)}
        
      />
      <Button 
      negative
      icon="trash"
      labelPosition="right"
      content="Delete"
      onClick={handleDelete}
      
      />
    </Modal.Actions>

  </Modal>
   </>;
}

export default ProductAttributes;
