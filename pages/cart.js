import CartItemList from '../components/Cart/CartItemList';
import CartSummary from '../components/Cart/CartSummary';
import {Segment} from 'semantic-ui-react';
import {parseCookies} from 'nookies';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import React from 'react';
import cookie from 'js-cookie';
import catchErrors from '../utils/catchErrors';
function Cart() {
  return (
    <Segment>
      <CartItemList/>
      <CartSummary/>
    </Segment>
  )
}

export default Cart;
