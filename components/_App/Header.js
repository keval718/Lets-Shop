import {Menu,Container,Image,Icon} from 'semantic-ui-react';
import Link from 'next/link';

function Header() {
  const user=true;
  return( 
   <Menu fluid id="menu" inverted>
     <Container text>
       <Link href="/">
         <Menu.Item header>
           <image
           size="mini"
           src="../static/logo.svg"
           style={{marginRight:'1em'}}
          />
          Let's Shop
         </Menu.Item>
       </Link>  
       <Link href="/cart">
         <Menu.Item header>
           <Icon
           name="cart"
           size="large"
          />
         Cart
         </Menu.Item>  
       </Link> 
       { user &&(
       <Link href="/create">
         <Menu.Item header>
           <Icon
           name="add square"
           size="large"
          />
         Create
         </Menu.Item>
       </Link>)}
       {/* This is used to check if the user is logn in or not is yes then will show account and signout and if not : will show login signup */}
      { user? (<>
       <Link href="/account">
         <Menu.Item header>
           <Icon
           name="user"
           size="large"
          />
         Account
         </Menu.Item>  
       </Link> 
         <Menu.Item header>
           <Icon
           name="sign out"
           size="large"
          />
        Sign out
         </Menu.Item> 
         </>)
      :
        ( <>
         <Link href="/login">
         <Menu.Item header>
           <Icon
           name="sign in"
           size="large"
          />
          
        
         Login
         </Menu.Item>
       
       </Link>  
       <Link href="/signup">
         <Menu.Item header>
           <Icon
           name="signup"
           size="large"

          />
         Sign up
         </Menu.Item>
       
       </Link>
      </>) } 
     </Container> 
   </Menu>    
  );
}

export default Header;
