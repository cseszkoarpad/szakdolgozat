import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {fetchAutos, fetchUser} from '../actions';

import TextInput from './form/TextInput'

class NewAutoPage extends Component {
  constructor() {
    super()
    this.state = {
      auto: {
        marka: '',
        modell: '',
        kep: '',
        ar: 0,
        ev: 0,
        allapot: '',
        kivitel: '',
        km: 0,
        szin: '',
        tomeg: 0,
        uzemanyag: '',
        hengerUrTartalom: 0,
        teljesitmeny: 0,
        hajtas: '',
        valto: '',
        leiras: ''
      }
    }

    this.onChange = this.onChange.bind(this)
    this.uploadAuto = this.uploadAuto.bind(this)
  }

  onChange(event) {
    const field = event.target.name;
    const auto = this.state.auto;
    auto[field] = event.target.value;
    this.setState({auto: auto});
  }

  async uploadAuto(e) {
    e.preventDefault()
    const auto = this.state.auto
    await axios.post('/api/autos/', {
      marka: auto.marka,
      modell: auto.modell,
      kep: auto.kep,
      ar: auto.ar,
      ev: auto.ev,
      allapot: auto.allapot,
      kivitel: auto.kivitel,
      km: auto.km,
      szin: auto.szin,
      tomeg: auto.tomeg,
      uzemanyag: auto.uzemanyag,
      hengerUrTartalom: auto.hengerUrTartalom,
      teljesitmeny: auto.teljesitmeny,
      hajtas: auto.hajtas,
      valto: auto.valto,
      leiras: auto.leiras
    })
    this.props.fetchAutos()
    this.props.fetchUser()
    this.props.history.push('/')
  }

  render() {
    if (!this.props.auth) {
      this.props.history.push('/')
    }
    let {kep, modell, marka, ar, ev, allapot, kivitel, km, szin, tomeg, uzemanyag, hengerUrTartalom, teljesitmeny, hajtas, valto, leiras} = this.state.auto
    return (
      <div className="container" style={{margin: '50px auto'}}>
        <div className="row">
          <form onSubmit={this.uploadAuto}>
            <TextInput
              name="marka"
              label="Márka:"
              value={marka}
              onChange={this.onChange}/>

            <TextInput
              name="modell"
              label="Modell:"
              value={modell}
              onChange={this.onChange}/>

            <TextInput
              name="kep"
              label="Kép linkje:"
              value={kep}
              onChange={this.onChange}/>

            <TextInput
              name="ar"
              label="Ár:"
              value={ar}
              onChange={this.onChange}/>

            <TextInput
              name="ev"
              label="Évjárat:"
              value={ev}
              onChange={this.onChange}/>

            <TextInput
              name="allapot"
              label="Állapot:"
              value={allapot}
              onChange={this.onChange}/>

            <TextInput
              name="kivitel"
              label="Kivitel:"
              value={kivitel}
              onChange={this.onChange}/>

            <TextInput
              name="km"
              label="Km óra állása:"
              value={km}
              onChange={this.onChange}/>

            <TextInput
              name="szin"
              label="Szín:"
              value={szin}
              onChange={this.onChange}/>

            <TextInput
              name="tomeg"
              label="Tömeg:"
              value={tomeg}
              onChange={this.onChange}/>

            <TextInput
              name="uzemanyag"
              label="Üzemanyag:"
              value={uzemanyag}
              onChange={this.onChange}/>

            <TextInput
              name="hengerUrTartalom"
              label="Hengerűrtartalom:"
              value={hengerUrTartalom}
              onChange={this.onChange}/>

            <TextInput
              name="teljesitmeny"
              label="Teljesítmény:"
              value={teljesitmeny}
              onChange={this.onChange}/>

            <TextInput
              name="hajtas"
              label="Hajtás:"
              value={hajtas}
              onChange={this.onChange}/>

            <TextInput
              name="valto"
              label="Váltó:"
              value={valto}
              onChange={this.onChange}/>

            <div className="form-group">
              <label htmlFor="leiras">Leírás:</label>
              <textarea type="text" rows="15" cols="150" maxLength="400" name="leiras" value={leiras}
                        onChange={this.onChange}/>
            </div>

            <p className="info">A feltöltés 1 creditbe kerül.</p>
            <p className="info">Crediteinek száma: {this.props.auth.credits ? this.props.auth.credits : '0'}</p>
            <button style={{margin: '45px 20px 0 0', background: '#4CAF50'}} type="submit"
                    className="waves-effect waves-light btn">
              <i className="icon ion-plus-round"></i> Létrehozás
            </button>
            <button style={{marginTop: '45px', background: '#FFEB3B'}} className="waves-effect waves-light btn">
              <Link style={{color: 'white'}} to="/">Mégse <i className="icon ion-arrow-left-a"></i></Link>
            </button>

          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps({auth}) {
  return {
    auth
  }
}

export default connect(mapStateToProps, {fetchAutos, fetchUser})(NewAutoPage)