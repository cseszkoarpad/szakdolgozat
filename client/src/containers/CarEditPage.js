import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteCar, updateCar} from '../actions/car';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import ImageUploader from 'react-images-upload';
import {EVJARATOK, HAJTAS_TIPUSOK, KIVITELEK, MARKAK, UZEMANYAG_TIPUSOK, VALTO_TIPUSOK} from '../constants';
import {SelectWrapped} from '../components/Search';

class CarEditPage extends Component {
  state = {
    marka: '',
    modell: '',
    preview_url: '',
    ar: 0,
    ev: 0,
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

  componentWillMount() {
    this.setState({...this.props.cars.data});
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  onSelectChange = (name) => (value) => {
    this.setState({[name]: value});
  };

  handleUpdateCar = (event) => {
    event.preventDefault();
    const id = this.props.match.params.id;
    const {
      marka, modell, preview_url, ar, ev, kivitel,
      km, szin, tomeg, uzemanyag, hengerUrtartalom,
      teljesitmeny, hajtas, valto, leiras,
    } = this.state;
    const car = {
      marka, modell, preview_url, ar, ev, kivitel,
      km, szin, tomeg, uzemanyag, hengerUrtartalom,
      teljesitmeny, hajtas, valto, leiras,
    };
    this.props.updateCar(id, car);
    this.props.history.push(`/cars/${id}`);
  };

  handleCancelButton = () => {
    this.props.history.goBack();
  };

  handleDeleteCar = () => {
    const carId = this.props.match.params.id;
    this.props.deleteCar(carId);
  };

  render() {
    let {preview_url, modell, marka, ar, ev, kivitel, km, szin, tomeg, uzemanyag, hengerUrtartalom, teljesitmeny, hajtas, valto, leiras} = this.state;
    return (
      <Paper>
        <form onSubmit={(e) => this.handleUpdateCar(e)}>
          <TextField
            style={{width: '300px'}}
            autoFocus
            required
            fullWidth
            name="marka"
            label="Márka"
            value={marka}
            placeholder="Márka kiválasztása"
            onChange={this.onSelectChange('marka')}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputComponent: SelectWrapped,
              inputProps: {
                instanceId: 'marka',
                simpleValue: true,
                options: MARKAK,
              },
            }}
          />

          <TextField
            style={{width: '300px'}}
            autoFocus
            fullWidth
            required
            name="modell"
            label="Modell"
            value={modell}
            onChange={this.onChange}
          />

          {/*<ImageUploader
            withIcon={true}
            buttonText='Válasszon ki képeket'
            onChange={this.fileChangedHandler}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            buttonClassName='btn btn--primary'
            label='Minimum 4 képet és maximum 10 képet tölthet fel'
            labelClass='font-size-big'
            fileSizeError='Túl nagy a kép mérete! 5MB a maximum.'
            fileTypeError='Nem támogatott fájl formátum!'
            withPreview
          />*/}

          <TextField
            style={{width: '300px'}}
            autoFocus
            fullWidth
            type="number"
            name="ar"
            label="Ár"
            value={ar}
            onChange={this.onChange}
          />

          <TextField
            style={{width: '300px'}}
            autoFocus
            fullWidth
            required
            placeholder="Kiválasztás..."
            name="ev"
            label="Évjárat"
            value={ev}
            onChange={this.onSelectChange('ev')}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputComponent: SelectWrapped,
              inputProps: {
                instanceId: 'ev',
                simpleValue: true,
                options: EVJARATOK,
              },
            }}
          />

          <TextField
            style={{width: '300px'}}
            autoFocus
            required
            fullWidth
            placeholder="Kiválasztás..."
            name="kivitel"
            label="Kivitel"
            value={kivitel}
            onChange={this.onSelectChange('kivitel')}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputComponent: SelectWrapped,
              inputProps: {
                instanceId: 'kivitel',
                simpleValue: true,
                options: KIVITELEK,
              },
            }}
          />

          <TextField
            style={{width: '300px'}}
            autoFocus
            required
            fullWidth
            type="number"
            name="km"
            label="Km óra állása"
            value={km}
            onChange={this.onChange}
          />

          <TextField
            style={{width: '300px'}}
            autoFocus
            required
            fullWidth
            name="szin"
            label="Szín"
            value={szin}
            onChange={this.onChange}
          />

          <TextField
            style={{width: '300px'}}
            autoFocus
            required
            fullWidth
            type="number"
            name="tomeg"
            label="Tömeg"
            value={tomeg}
            onChange={this.onChange}
          />

          <TextField
            style={{width: '300px'}}
            autoFocus
            required
            fullWidth
            placeholder="Kiválasztás..."
            name="uzemanyag"
            label="Üzemanyag"
            value={uzemanyag}
            onChange={this.onSelectChange('uzemanyag')}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputComponent: SelectWrapped,
              inputProps: {
                instanceId: 'uzemanyag',
                simpleValue: true,
                options: UZEMANYAG_TIPUSOK,
              },
            }}
          />

          <TextField
            style={{width: '300px'}}
            autoFocus
            required
            fullWidth
            type="number"
            name="hengerUrtartalom"
            label="Hengerűrtartalom"
            value={hengerUrtartalom}
            onChange={this.onChange}
          />

          <TextField
            style={{width: '300px'}}
            autoFocus
            required
            fullWidth
            type="number"
            name="teljesitmeny"
            label="Teljesítmény"
            value={teljesitmeny}
            onChange={this.onChange}
          />

          <TextField
            style={{width: '300px'}}
            autoFocus
            name="hajtas"
            label="Hajtás"
            placeholder="Kiválasztás..."
            value={hajtas}
            onChange={this.onSelectChange('hajtas')}
            required
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputComponent: SelectWrapped,
              inputProps: {
                instanceId: 'hajtas',
                simpleValue: true,
                options: HAJTAS_TIPUSOK,
              },
            }}
          />

          <TextField
            style={{width: '300px'}}
            autoFocus
            name="valto"
            label="Váltó"
            placeholder="Kiválasztás..."
            value={valto}
            onChange={this.onSelectChange('valto')}
            required
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputComponent: SelectWrapped,
              inputProps: {
                instanceId: 'valto',
                simpleValue: true,
                options: VALTO_TIPUSOK,
              },
            }}
          />

          <TextField
            style={{width: '300px'}}
            autoFocus
            fullWidth
            name="leiras"
            label="Leírás"
            value={leiras}
            multiline
            onChange={this.onChange}
          />

          <div>
            <Button type="submit">Mentés</Button>
            <Button onClick={this.handleCancelButton}>Mégse</Button>
            <Button onClick={this.handleDeleteCar}>Törlés</Button>
          </div>
        </form>
      </Paper>
    );
  }
}

const mapStateToProps = ({cars}) => {
  return {
    cars,
  };
};

export default connect(mapStateToProps, {updateCar, deleteCar})(CarEditPage);