import Stripe from 'stripe';
import uuidv4 from 'uuid/v4';
import jwt from 'jsonwebtoken';
import Cart from '../../models/Cart';
import Order from '../../models/Order';
import calculateCartTotal from '../../utils/calculateCartTotal';

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req,res)=>{
    const {paymentData} = req.body;

    try {
        //verify and get user id
        const {userId} = jwt.verify(req.headers.authorization,process.env.JWT_SECRET);

        //find cart using user id and populate
        const cart = await Cart.findOne({user:userId}).populate({
            path:"products.product",
            model:"Product"
        })

        //calculate cart totals
        const{cartTotal,stripeTotal} = calculateCartTotal(cart.products);

        //get email for payment, check if customer is existing stripe customer
        const prevCustomer = await stripe.customers.list({
            email:paymentData.email,
            limit:1
        }) 
        const isCustomer = prevCustomer.data.length>0;

        //create customer if not
        let newCustomer;
        if(!isCustomer){
            newCustomer = await stripe.customers.create({
                email:paymentData.email,
                source: paymentData.id
            })
        }

        const customer = (isCustomer && prevCustomer.data[0].id) || newCustomer.id;

        //create charge and send receipt
       const charge = await stripe.charges.create({
            currency:"cad",
            amount:stripeTotal,
            receipt_email:paymentData.email,
            customer,
            description: `Checkout | ${paymentData.email} | ${paymentData.id}`
        },{
            idempotency_key:uuidv4()
        })

        //add order data to db
        await new Order({
            user:userId,
            email:paymentData.email,
            total:cartTotal,
            products:cart.products
        }).save();

        //clear products
        await Cart.findOneAndUpdate(
            {_id:cart._id},
            {$set:{products:[]}}
        )

        //send success
        res.status(200).send("Checkout successful");
    } catch (error) {
        console.error(error);
        res.status(500).send('Error in processing charge');
    }
}