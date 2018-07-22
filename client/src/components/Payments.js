import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import {handleToken} from '../actions/user';
import Button from '@material-ui/core/Button';

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="CarReact"
        description="$1 a képfeltöltésért"
        amount={100}
        panelLabel="Fizetek:"
        token={token => this.props.handleToken(token)}
        stripeKey={'pk_test_7veAZeDwcZrBccb8HOmxCb0s'}
      >
        <Button>
          Vétel
        </Button>
      </StripeCheckout>
    );
  }
}

export default connect(null, {handleToken})(Payments);
