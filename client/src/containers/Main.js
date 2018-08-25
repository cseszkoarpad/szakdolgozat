import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loader from '../components/Loader';
import Search from '../components/Search';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import {fetchCars} from '../actions/car';

class Main extends Component {

  componentWillMount() {
    this.props.fetchCars();
  }

  renderCars = () => {
    const {allCar, search, data} = this.props.cars;
    if (Object.keys(search).length === 0 && search.constructor === Object) {
      return allCar.map(car => (
          <GridListTile onClick={() => this.props.history.push(`/cars/${car.id}`)} className="cursor--pointer"
                        key={car.id}>
            <img src={car.preview_url}
                 alt={`${car.marka}-${car.modell}`}/>
            <GridListTileBar
              title={car.marka}
              subtitle={<span>{car.modell} ({car.ev})</span>}
            />
          </GridListTile>
        ),
      );
    } else {
      return data.map(car => (
          <GridListTile onClick={() => this.props.history.push(`/cars/${car.id}`)} className="cursor--pointer"
                        key={car.id}>
            <img src={car.preview_url}
                 alt={`${car.marka}-${car.modell}`}/>
            <GridListTileBar
              title={car.marka}
              subtitle={<span>{car.modell} ({car.ev})</span>}
            />
          </GridListTile>
        ),
      );
    }
  };

  render() {
    if (this.props.cars.allCar.length > 0) {
      return (
        <Grid container spacing={8}>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <Search/>
          </Grid>
          <Grid item xs={12} sm={8} md={9} lg={10}>
            <Paper className="padding-medium padding-side-medium">
              <GridList spacing={10} cols={3}>
                {this.renderCars()}
              </GridList>
            </Paper>
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
    cars,
  };
}

export default connect(mapStateToProps, {fetchCars})(Main);