// must restart server whenever you make changes in next.config
module.exports = {
  env: {
    MONGO_SRV: "mongodb+srv://keval:Keval1234@cluster0-54swq.mongodb.net/test?retryWrites=true&w=majority",
    JWT_SECRET: "<insert-jwt-secret>",
    CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/dre0ny8x0/image/upload",
    STRIPE_SECRET_KEY: "<insert-stripe-secret-key>"
  }
};
