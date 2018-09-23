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
    if (cars) {
      return (
        <Paper>
          {cars.length ? cars.map(car => <CarCapture key={car.id} {...car} />)
              : <h5 className="no-car-title">Nincs feltöltve autója</h5>}
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