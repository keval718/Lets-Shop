import {Form,Input,TextArea,Image,Button,Icon,Message,Header, FormField } from 'semantic-ui-react'
function CreateProduct() {
  return <>
  <Header as="h2" block >
    <Icon name="add" color="orange"/>
      Create New Product
    </Header>
    <Form>
      <Form.Group widths="equal">
        <Form.Field 
        control={Input}
        name="name"
        label="Name"
        placeholder="Name"
        />
          <Form.Field 
        control={Input}
        name="price"
        label="Price"
        placeholder="Price"
        min="0.00"
        step="0.01"
        type="number"
        />
          <Form.Field 
        control={Input}
        name="media"
        label="media"
        accept="image/*" 
        type="file"
        content="select image"

       
        />

      </Form.Group>
      <Form.Field 
      control={TextArea}
      name="description"
      label="Description"
      placeholder="Description"

      
      />
      <Form.Field 
      control={Button}
      color="blue"
      icon="pencil alternate"
      content="submit"
      type="submit"
      
      
      />
    </Form>

  </>;
}

export default CreateProduct;
