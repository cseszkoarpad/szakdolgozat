import React, {Component} from 'react';
import {connect} from 'react-redux';
import Auto from '../components/Auto';
import Loader from '../components/Loader';
import Search from '../components/Search';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class Main extends Component {
  renderAutos = () => {
    return this.props.autos.map(auto => <Auto key={auto._id} {...auto} />);
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

function mapStateToProps({autos}) {
  return {
    autos
  };
}

export default connect(mapStateToProps)(Main);