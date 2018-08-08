import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loader from '../components/Loader';
import Search from '../components/Search';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import {Link} from 'react-router-dom';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import InfoIcon from '@material-ui/icons/Info';
import {fetchCars} from '../actions/car';
import Button from '@material-ui/core/Button';

const styles = {

  search: {
    padding: '15px',
  },
  cars: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tileWrapper: {
    borderRadius: '5px',
  },
  button: {
    color: 'white',
  },
  icon: {
    paddingLeft: '5px',
    color: 'white',
  },
};

class Main extends Component {

  componentWillMount() {
    this.props.fetchCars();
  }

  renderCars = (classes) => this.props.cars.map(car => (
      <GridListTile classes={{tile: classes.tileWrapper}} key={car.id}>
        <img
          src={car.kep ? car.kep : 'http://maestroselectronics.com/wp-content/uploads/2017/12/No_Image_Available.jpg'}
          alt={`${car.marka}-${car.modell}`}/>
        <GridListTileBar
          classes={{actionIcon: classes.button}}
          title={car.marka}
          subtitle={<span>{car.modell} ({car.ev})</span>}
          actionIcon={
            <Button component={Link} to={`/cars/${car.id}`} color="primary" className={classes.button}>
              Részletek
              <InfoIcon className={classes.icon}/>
            </Button>
          }
        />
      </GridListTile>
    ),
  );

  render() {
    const {classes} = this.props;

    if (this.props.cars.length > 0) {
      return (
        <Grid className={classes.container} container spacing={8}>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <Paper className={classes.search}>
              <Search/>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8} md={9} lg={10}>
            <Paper className={classes.search}>
              <GridList spacing={10} cols={3} className={classes.cars}>
                {this.renderCars(classes)}
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

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps({cars}) {
  return {
    cars,
  };
}

export default connect(mapStateToProps, {fetchCars})(withStyles(styles)(Main));