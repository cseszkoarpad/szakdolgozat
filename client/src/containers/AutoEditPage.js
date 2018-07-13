import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addAuto, deleteAuto, fetchAutos, updateAuto} from '../actions/auto';
import '../styles/autoDetails.css';

import TextInput from '../components/form/TextInput';

class AutoEditPage extends Component {
  state = {
    id: '',
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
    originalAuto: {}
  };

  componentWillMount() {
    if (!this.props.auth) {
      this.props.history.push('/');
    }
    if (this.state.isEditing) {
      const id = this.props.match.params.id;
      const originalAuto = Object.assign({}, this.props.autos.find(auto => auto.id === id));
      this.setState({...originalAuto, originalAuto, id});
    }
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  updateAuto = (event) => {
    event.preventDefault();
    const {
      id, marka, modell, kep, ar, ev, allapot, kivitel, km, szin, tomeg, uzemanyag, hengerUrtartalom,
      teljesitmeny, hajtas, valto, leiras
    } = this.state;
    const auto = {
      id,
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
    this.props.updateAuto(auto);
    this.props.history.push(`/autos/${id}`);
  };

  addAuto = (event) => {
    event.preventDefault();
    const {
      id, marka, modell, kep, ar, ev, allapot, kivitel, km, szin, tomeg, uzemanyag, hengerUrtartalom,
      teljesitmeny, hajtas, valto, leiras
    } = this.state;
    const auto = {
      id,
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
    this.props.addAuto(auto);
    this.props.history.push(`/autos/${id}`);
  };

  handleCancelButton = (event) => {
    event.preventDefault();
    this.props.history.goBack();
  };

  deleteAuto = (event, id) => {
    event.preventDefault();
    this.props.deleteAuto(id);
  };

  render() {
    let {id, kep, modell, marka, ar, ev, allapot, kivitel, km, szin, tomeg, uzemanyag, hengerUrtartalom, teljesitmeny, hajtas, valto, leiras, feltoltve, likes, isEditing} = this.state;
    return (
      <div className="container">
        <div className="row">
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
          <form onSubmit={(e) => isEditing ? this.updateAuto(e) : this.addAuto(e)}>
            <div className="col s5">
              <ul className="points">
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
                  label="Kép url:"
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
                  name="hengerUrtartalom"
                  label="Hengerűrtartalom:"
                  value={hengerUrtartalom}
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
                  <label>Leírás:</label>
                  <textarea rows="15" cols="150" maxLength="400" name="leiras"
                            value={leiras} onChange={this.onChange}/>
                </div>

                {isEditing
                  ? <div>
                    <button type="submit" className="waves-effect waves-light btn">Mentés <i
                      className="icon ion-bookmark"></i></button>
                    <button className="waves-effect waves-light btn" onClick={(e) => this.handleCancelButton(e)}>Mégse <i
                      className="icon ion-arrow-left-a"></i></button>
                    <button className="waves-effect waves-light btn"
                            onClick={(e) => this.deleteAuto(e, id)}>Törlés <i
                      className="icon ion-trash-b"></i>
                    </button>
                  </div>
                  : <div><p className="info">A feltöltés 1 creditbe kerül.</p>
                    <p className="info">Crediteinek száma: {this.props.auth.credits ? this.props.auth.credits : '0'}</p>
                    <button style={{margin: '45px 20px 0 0', background: '#4CAF50'}} type="submit"
                            className="waves-effect waves-light btn">
                      <i className="icon ion-plus-round"></i> Létrehozás
                    </button>
                    <button style={{marginTop: '45px', background: '#FFEB3B'}} onClick={(e) => this.handleCancelButton(e)} className="waves-effect waves-light btn">Mégse <i className="icon ion-arrow-left-a"></i>
                    </button>
                  </div>}

              </ul>
            </div>
          </form>
        </div>
      </div>
    );
  }


}

const mapStateToProps = ({autos, auth}) => {
  return {
    autos,
    auth
  };
};

export default connect(mapStateToProps, {fetchAutos, updateAuto, deleteAuto, addAuto})(AutoEditPage);