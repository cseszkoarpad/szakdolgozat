module.exports = {
  mongoDatabase: process.env.MONGO_URI,
  database: process.env.DATABASE_URL,
  secret: process.env.SESSION_SECRET,
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  redirectDomain: process.env.REDIRECT_DOMAIN
};