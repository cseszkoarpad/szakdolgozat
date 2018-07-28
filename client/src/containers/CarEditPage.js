import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addCar, deleteCar, updateCar} from '../actions/car';
import '../styles/carDetails.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

class CarEditPage extends Component {
  state = {
    _id: '',
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
    likes: 0,
    feltoltve: '',
    isEditing: false,
    originalCar: {}
  };

  componentWillMount() {
    if (!this.props.auth) {
      this.props.history.push('/');
    }
    if (this.state.isEditing) {
      const id = this.props.match.params.id;
      const originalCar = Object.assign({}, this.props.cars.find(car => car._id === id));
      this.setState({...originalCar, originalCar});
    }
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleUpdateCar = (event) => {
    event.preventDefault();
    const {
      _id, marka, modell, kep, ar, ev, allapot, kivitel, km, szin, tomeg, uzemanyag, hengerUrtartalom,
      teljesitmeny, hajtas, valto, leiras
    } = this.state;
    const car = {
      _id,
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
      leiras
    };
    this.props.updateCar(car);
    this.props.history.push(`/cars/${_id}`);
  };

  handleAddCar = (event) => {
    event.preventDefault();
    const {
      marka, modell, kep, ar, ev, allapot, kivitel, km, szin, tomeg, uzemanyag, hengerUrtartalom,
      teljesitmeny, hajtas, valto, leiras
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
      leiras
    };
    this.props.addCar(car);
    this.props.history.push(`/`);
  };

  handleCancelButton = () => {
    this.props.history.goBack();
  };

  handleDeleteCar = (_id) => {
    this.props.deleteCar(_id);
  };

  render() {
    let {_id, kep, modell, marka, ar, ev, allapot, kivitel, km, szin, tomeg, uzemanyag, hengerUrtartalom, teljesitmeny, hajtas, valto, leiras, feltoltve, likes, isEditing} = this.state;
    return (
      <Paper>
        {(marka && modell && kep) &&
        <div>
          <h6 className="title">{marka} - {modell}</h6>
          <div className="col s7">
            <img className="img"
                 src={kep ? kep : 'http://maestroselectronics.com/wp-content/uploads/2017/12/No_Image_Available.jpg'}
                 alt={`${marka}-${modell}`}/>
            {isEditing && <ul className="points">
              <li className="uploaded"><span>Feltöltve:</span>{feltoltve}</li>
              <li className="text"><span>Kedvelések:</span>{likes}</li>
            </ul>}
          </div>
        </div>}
        <form onSubmit={isEditing ? (e) => this.handleUpdateCar(e) : (e) => this.handleAddCar(e)}>
          <div className="col s5">
            <ul className="points">
              <TextField
                name="marka"
                label="Márka:"
                value={marka}
                onChange={this.onChange}/>

              <TextField
                name="modell"
                label="Modell:"
                value={modell}
                onChange={this.onChange}/>

              <TextField
                name="kep"
                label="Kép url:"
                value={kep}
                onChange={this.onChange}/>

              <TextField
                name="ar"
                label="Ár:"
                value={ar}
                onChange={this.onChange}/>

              <TextField
                name="ev"
                label="Évjárat:"
                value={ev}
                onChange={this.onChange}/>

              <TextField
                name="allapot"
                label="Állapot:"
                value={allapot}
                onChange={this.onChange}/>

              <TextField
                name="kivitel"
                label="Kivitel:"
                value={kivitel}
                onChange={this.onChange}/>

              <TextField
                name="km"
                label="Km óra állása:"
                value={km}
                onChange={this.onChange}/>

              <TextField
                name="szin"
                label="Szín:"
                value={szin}
                onChange={this.onChange}/>

              <TextField
                name="tomeg"
                label="Tömeg:"
                value={tomeg}
                onChange={this.onChange}/>

              <TextField
                name="uzemanyag"
                label="Üzemanyag:"
                value={uzemanyag}
                onChange={this.onChange}/>

              <TextField
                name="hengerUrtartalom"
                label="Hengerűrtartalom:"
                value={hengerUrtartalom}
                onChange={this.onChange}/>

              <TextField
                name="teljesitmeny"
                label="Teljesítmény:"
                value={teljesitmeny}
                onChange={this.onChange}/>

              <TextField
                name="hajtas"
                label="Hajtás:"
                value={hajtas}
                onChange={this.onChange}/>

              <TextField
                name="valto"
                label="Váltó:"
                value={valto}
                onChange={this.onChange}/>

              <TextField
                name="leiras"
                label="Leírás:"
                value={leiras}
                multiline={true}
                onChange={this.onChange}/>

              {isEditing && this.props.auth && this.props.auth.credits
                ? <div>
                  <Button type="submit">Mentés</Button>
                  <Button onClick={this.handleCancelButton}>Mégse</Button>
                  <Button onClick={() => this.handleDeleteCar(_id)}>Törlés</Button>
                </div>
                : <div><p className="info">A feltöltés 1 creditbe kerül.</p>
                  <p className="info">Crediteinek száma: {this.props.auth.credits ? this.props.auth.credits : '0'}</p>
                  <Button type="submit">Létrehozás</Button>
                  <Button onClick={this.handleCancelButton}>Mégse</Button>
                </div>}
            </ul>
          </div>
        </form>
      </Paper>
    );
  }
}

const mapStateToProps = ({auth, cars}) => {
  return {
    auth,
    cars
  };
};

export default connect(mapStateToProps, {updateCar, deleteCar, addCar})(CarEditPage);