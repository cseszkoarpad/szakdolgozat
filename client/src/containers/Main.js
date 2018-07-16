import React, {Component} from 'react';
import {connect} from 'react-redux';
import Auto from '../components/Auto';
import Loader from '../components/Loader';
import Search from '../components/Search';

class Main extends Component {
  renderAutos = () => {
    return this.props.autos.map(auto => <Auto key={auto._id} {...auto} />);
  };

  render() {
    if (this.props.autos) {
      return (
        <div className="container">
          <div className="row">
            <div className="col s6">
              <div className="autos-flex">
                {this.renderAutos()}
              </div>
            </div>
            <div className="col s6">
              <Search />
            </div>
          </div>
        </div>
      );
    } else {
      return <Loader/>;
    }

  }
}

const mapStateToProps = ({autos}) => {
  return {
    autos
  };
};

export default connect(mapStateToProps)(Main);