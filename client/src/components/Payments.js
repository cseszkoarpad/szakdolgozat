import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="AutoReact"
        description="$1 a képfeltöltésért"
        amount={100}
        panelLabel="Fizetek:"
        token={token => this.props.handleToken(token)}
        stripeKey={'pk_test_7veAZeDwcZrBccb8HOmxCb0s'}
      >
        <button className="waves-effect waves-light btn" style={{ background: 'rgb(21, 101, 192)' }}>
          Vétel
        </button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
