import React, {Component} from 'react';
import {connect} from 'react-redux';
import Auto from './Auto';
import '../styles/main.css';

class Main extends Component {
  renderAutos = () => {
    return this.props.autos.map(auto => <Auto key={auto._id} {...auto} />);
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="autos-flex">
            {this.renderAutos()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({autos}) => {
  return {
    autos
  };
};

export default connect(mapStateToProps)(Main);