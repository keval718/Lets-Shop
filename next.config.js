// must restart server whenever you make changes in next.config
module.exports = {
  env: {
    MONGO_SRV: "mongodb+srv://keval:Keval1234@cluster0-54swq.mongodb.net/test?retryWrites=true&w=majority",
    JWT_SECRET: "<insert-jwt-secret>",
    CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/dre0ny8x0/image/upload",
    STRIPE_SECRET_KEY: "sk_test_51H4EbPJedy6Ct13RF3P5S7VwGzjPdHNnxlHVjMYheYRu4x95l3V6gj4z7DAENrIjUv9CLOrG9wKgpSppqHCWbYHx00bA2TJTeD"
  }
};
