import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addCar, deleteCar, updateCar} from '../actions/car';
import '../styles/carDetails.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

class CarUploadPage extends Component {
  state = {
    stepCount: 0,
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
    hengerUrtartalom: 0,
    teljesitmeny: 0,
    hajtas: '',
    valto: '',
    leiras: '',
  };

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value, stepCount: this.state.stepCount + 1});
  };

  handleAddCar = (event) => {
    event.preventDefault();
    const {
      marka, modell, kep, ar, ev, allapot, kivitel, km, szin, tomeg, uzemanyag, hengerUrtartalom,
      teljesitmeny, hajtas, valto, leiras,
    } = this.state;
    const car = {
      marka,
      modell,
      kep,
      ar,
      ev,
      allapot,
      kivitel,
      km,
      szin,
      tomeg,
      uzemanyag,
      hengerUrtartalom,
      teljesitmeny,
      hajtas,
      valto,
      leiras,
    };
    this.props.addCar(car);
    this.props.history.push(`/`);
  };

  handleCancelButton = () => {
    this.props.history.goBack();
  };

  render() {
    const {stepCount, kep, modell, marka, ar, ev, allapot, kivitel, km, szin, tomeg, uzemanyag, hengerUrtartalom, teljesitmeny, hajtas, valto, leiras, feltoltve, likes, isEditing} = this.state;
    return (
      <Paper>
        <form onSubmit={(e) => this.handleAddCar(e)}>
          {stepCount === 0 && <TextField
            name="marka"
            label="Márka"
            value={marka}
            onChange={this.onChange}/>}

          {stepCount === 1 && <TextField
            name="modell"
            label="Modell"
            value={modell}
            onChange={this.onChange}/>}

          {stepCount === 2 && <TextField
            name="kep"
            label="Kép url"
            value={kep}
            onChange={this.onChange}/>}

          {stepCount === 3 && <TextField
            name="ar"
            label="Ár"
            value={ar}
            onChange={this.onChange}/>}

          {stepCount === 4 && <TextField
            name="ev"
            label="Évjárat"
            value={ev}
            onChange={this.onChange}/>}

          {stepCount === 5 && <TextField
            name="allapot"
            label="Állapot"
            value={allapot}
            onChange={this.onChange}/>}

          {stepCount === 6 && <TextField
            name="kivitel"
            label="Kivitel"
            value={kivitel}
            onChange={this.onChange}/>}

          {stepCount === 7 && <TextField
            name="km"
            label="Km óra állása"
            value={km}
            onChange={this.onChange}/>}

          {stepCount === 8 && <TextField
            name="szin"
            label="Szín"
            value={szin}
            onChange={this.onChange}/>}

          {stepCount === 9 && <TextField
            name="tomeg"
            label="Tömeg"
            value={tomeg}
            onChange={this.onChange}/>}

          {stepCount === 10 && <TextField
            name="uzemanyag"
            label="Üzemanyag"
            value={uzemanyag}
            onChange={this.onChange}/>}

          {stepCount === 11 && <TextField
            name="hengerUrtartalom"
            label="Hengerűrtartalom"
            value={hengerUrtartalom}
            onChange={this.onChange}/>}

          {stepCount === 12 && <TextField
            name="teljesitmeny"
            label="Teljesítmény"
            value={teljesitmeny}
            onChange={this.onChange}/>}

          {stepCount === 13 && <TextField
            name="hajtas"
            label="Hajtás"
            value={hajtas}
            onChange={this.onChange}/>}

          {stepCount === 14 && <TextField
            name="valto"
            label="Váltó"
            value={valto}
            onChange={this.onChange}/>}

          {stepCount === 15 && <TextField
            name="leiras"
            label="Leírás"
            value={leiras}
            multiline={true}
            onChange={this.onChange}/>}

          {stepCount === 16 && <div>
            <p className="info">A feltöltés 1 creditbe kerül.</p>
            <p className="info">Crediteinek száma: {this.props.auth.credits ? this.props.auth.credits : '0'}</p>
            <Button type="submit">Létrehozás</Button>
            <Button onClick={this.handleCancelButton}>Mégse</Button>
          </div>}
        </form>
      </Paper>
    );
  }
}

const mapStateToProps = ({auth, cars}) => {
  return {
    auth,
    cars,
  };
};

export default connect(mapStateToProps, {updateCar, deleteCar, addCar})(CarUploadPage);