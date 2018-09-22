import React, {Component} from 'react';
import {connect} from 'react-redux';
import CarCapture from '../components/CarCapture';
import Loader from '../components/Loader';
import Paper from '@material-ui/core/Paper';
import {fetchCarsFromUser} from '../actions/car';

class CarListPage extends Component {

  componentWillMount() {
    this.props.fetchCarsFromUser(this.props.auth.userId);
  }

  render() {
    const {cars} = this.props;
    console.log(cars);
    if (cars) {
      return (
        <Paper>
          {cars.length ? cars.map(car => <CarCapture key={car.id} {...car} />)
              : <h6>Nincs feltöltve autója</h6>}
        </Paper>
      );
    } else {
      return <Loader/>;
    }
  }
}

function mapStateToProps({auth, cars}) {
  return {
    auth,
    cars: cars.data,
  };
}

export default connect(mapStateToProps, {fetchCarsFromUser})(CarListPage);