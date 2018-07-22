import React, {Component} from 'react';
import {connect} from 'react-redux';
import AutoCapture from '../components/AutoCapture';
import Loader from '../components/Loader';
import Search from '../components/Search';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class CarListPage extends Component {
  renderAutos = () => {
    return this.props.autos.map(auto => <AutoCapture key={auto._id} {...auto} />);
  };

  render() {
    if (this.props.autos) {
      return (
        <Grid container spacing={8}>
          <Grid item xs={2}>
            <Paper className="search">
              <Search/>
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper className="autos">{this.renderAutos()}</Paper>
          </Grid>
        </Grid>
      );
    } else {
      return <Loader/>;
    }

  }
}

function mapStateToProps({auth, autos}) {
  return {
    auth,
    autos
  };
}

export default connect(mapStateToProps)(CarListPage);