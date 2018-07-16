import React, {Component} from 'react'
import Select from 'react-select';
import {connect} from 'react-redux';

class Search extends Component {
  state = {
    marka: '',
    modell: '',
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  renderMarkaOptions = () => {
    return []
  }

  renderModellOptions = () => {
    return []
  }

  render() {
    return (
      <div className="search">
        <Select name="marka" value={this.state.marka} options={this.renderMarkaOptions()} onChange={this.onChange}/>
        <Select name="modell" value={this.state.modell} options={this.renderModellOptions()} onChange={this.onChange}/>
      </div>
    )
  }
}

const mapStateToProps = ({autos}) => {
  return {
    autos
  }
}

export default connect(mapStateToProps)(Search)