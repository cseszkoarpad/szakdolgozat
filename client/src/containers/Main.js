import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loader from '../components/Loader';
import Search from '../components/Search';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import {fetchCars, search} from '../actions/car';

class Main extends Component {

  componentWillMount() {
    this.props.fetchCars();
  }

  convertPrice = (ar) => {
    return ar.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') + ' Ft';
  };

  handleDeleteSearchTerms = () => {
    this.props.search({});
  };

  renderCars = () => {
    let carList;
    const {allCar, search, data} = this.props.cars;
    carList = (Object.keys(search).length === 0 && search.constructor === Object) ? allCar : data;
    return carList.length > 0 ? carList.map(car => (
        <GridListTile onClick={() => this.props.history.push(`/cars/${car.id}`)} key={car.id}
                      classes={{root: 'grid-car-list-item', tile: 'grid-car-list-item-tile'}}>
          <img src={car.preview_url} alt={`${car.marka}-${car.modell}`}/>
          <GridListTileBar title={<span className="font-size-big2">{car.marka}</span>}
                           subtitle={<span className="font-size-medium">{car.modell} ({car.ev})</span>}
                           actionIcon={
                             <span className="grid-list-item-price">
                               {car.ar > 0 && this.convertPrice(car.ar)}
                             </span>
                           }
          />
        </GridListTile>
      ),
      )
      : <h5 className="no-car-title">
        Nincs találat
      </h5>;
  };

  render() {
    return (
      <Grid container spacing={8}>
        <Grid item xs={12} sm={4} md={3} lg={2}>
          <Search/>
        </Grid>
        <Grid item xs={12} sm={8} md={9} lg={10}>
          <Paper className="padding-medium padding-side-medium">
            <GridList spacing={10}>
              {this.props.cars.allCar.length ? this.renderCars() : <Loader/>}
            </GridList>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps({cars}) {
  return {
    cars,
  };
}

export default connect(mapStateToProps, {fetchCars, search})(Main);