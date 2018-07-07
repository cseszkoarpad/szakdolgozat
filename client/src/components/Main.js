import React, {Component} from 'react'
import {connect} from 'react-redux'
import Auto from './Auto'
import '../styles/main.css'

class Main extends Component {

  render() {
    const autos = this.props.autos.map(auto => <Auto key={auto._id} {...auto} />)

    return (
      <div className="container">
        <div className="row">
          <div className="autos-flex">
            {autos}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({autos}) {
  return {
    autos
  }
}

export default connect(mapStateToProps)(Main)