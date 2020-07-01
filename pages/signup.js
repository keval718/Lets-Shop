
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';
import React from 'react';
import catchErrors from '../utils/catchErrors';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import {handleLogin} from '../utils/auth';
import { set } from 'nprogress';
const INITIAL_USER={
  name:"",
  email:"",
  password:""
}
function Signup() {
  const [user,setUser] = React.useState(INITIAL_USER);
  const [disabled,setDisabled] = React.useState(true);
  const [loading,setLoading] = React.useState(false);
  const [error,setError] = React.useState("");
  React.useEffect(()=>{
    const isUser = Object.values(user).every(el=>Boolean(el))
    isUser ? setDisabled(false):setDisabled(true);
  },[user]) 

  function handleChange(e){
    const {name,value} = e.target
    setUser(prevState => ({...prevState,[name]:value}))
  }
  async function handleSubmit(e){
    e.preventDefault();
    try{
    setLoading(true);
    setError('');
    const url = `${baseUrl}/api/signup`;
    const payload= { ...user}
    const response = await axios.post(url,payload);
    handleLogin(response.data);
    console.log(user);
    }
    catch(error)
    {
      catchErrors(error,setError);
   }
    finally
    {
      setLoading(false);
    }

  }
  return <>
  <Message
    attached
    icon="settings"
    header="Get Started!"
    content="Create a new account"
    color="teal"
  />

  <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
    <Message 
    error
    header="Opps!"
    content={error}
    
    />
    <Segment>
      <Form.Input
        fluid
        icon="user"
        iconPosition="left"
        label="Name"
        placeholder="Name"
        name="name" 
        value={user.name}
        onChange={handleChange}
        />
      <Form.Input
        fluid
        icon="envelope"
        iconPosition="left"
        label="Email"
        placeholder="Email"
        name="email" 
        type="email"
        value={user.email}
        onChange={handleChange}
        />

      <Form.Input
        fluid
        icon="lock"
        iconPosition="left"
        label="Password"
        type="password"
        placeholder="Password"
        name="password" 
        value={user.password}
        onChange={handleChange}
        />

      <Button
        icon="signup"
        type="submit"
       disabled={disabled || loading}
        color="orange"
        content="Signup"
      />
    </Segment>
  </Form>
  <Message
    attached="bottom" warning>
    
    Existing user?{" "}
    <Link href="/login">
      <a>Log in here</a>
    </Link>{" "}instead.
  </Message>

</>;


}

export default Signup;
