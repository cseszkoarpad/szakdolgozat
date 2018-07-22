import React, {Component} from 'react';
import {connect} from 'react-redux';
import Car from '../components/Car';
import Loader from '../components/Loader';
import Search from '../components/Search';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class Main extends Component {
  renderCars = () => {
    return this.props.cars.map(car => <Car key={car._id} {...car} />);
  };

  render() {
    if (this.props.cars) {
      return (
        <Grid container spacing={8}>
          <Grid item xs={2}>
            <Paper className="search">
              <Search/>
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper className="cars">{this.renderCars()}</Paper>
          </Grid>
        </Grid>
      );
    } else {
      return <Loader/>;
    }

  }
}

function mapStateToProps({cars}) {
  return {
    cars
  };
}

export default connect(mapStateToProps)(Main);