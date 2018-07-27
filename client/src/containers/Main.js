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
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const styles = {
  search: {
    padding: '10px',
  },
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'space-around',
    justifyContent: 'space-around',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
};

class Main extends Component {
  renderCars = (classes) => this.props.cars.map(car => (
      <GridListTile key={car._id} style={{width: '150px', height: '168px'}}>
        <Link className="car" to={`/cars/${car._id}`}>
          <img
            src={car.kep ? car.kep : 'http://maestroselectronics.com/wp-content/uploads/2017/12/No_Image_Available.jpg'}
            alt={`${car.marka}-${car.modell}`}/>
          <GridListTileBar
            title={car.marka}
            subtitle={<span>{car.modell}</span>}
            actionIcon={
              <IconButton className={classes.icon}>
                <InfoIcon/>
              </IconButton>
            }
          />
        </Link>
      </GridListTile>
    ),
  );

  render() {
    const {classes} = this.props;

    if (this.props.cars) {
      return (
        <Grid container spacing={8}>
          <Grid item xs={2}>
            <Paper className={classes.search}>
              <Search/>
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper>
              <GridList className={classes.root}>
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

export default connect(mapStateToProps)(withStyles(styles)(Main));