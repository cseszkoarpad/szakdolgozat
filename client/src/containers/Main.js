import React, {Component} from 'react';
import {connect} from 'react-redux';
import Auto from '../components/Auto';
import Loader from '../components/Loader';

class Main extends Component {
  renderAutos = () => {
    return this.props.autos.map(auto => <Auto key={auto._id} {...auto} />);
  };

  render() {
    if (this.props.autos) {
      return (
        <div className="container">
          <div className="row">
            <div className="autos-flex">
              {this.renderAutos()}
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