const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 100,
      currency: 'usd',
      description: '$1 a feltöltésért',
      source: req.body.id
    });

    req.user.credits += 1;
    req.user.save()
    .then(user => res.send(user))
    .catch(error => console.error(error))
  });
};
