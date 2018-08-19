import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import {connect} from 'react-redux';
import {addCar, uploadCarImage} from '../actions/car';
import ImageUploader from 'react-images-upload';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import {withStyles} from '@material-ui/core';
import {
  ALLAPOTOK,
  EVJARATOK,
  HAJTAS_TIPUSOK,
  KIVITELEK,
  MARKAK,
  UNSIGNED_UPLOAD_PRESET,
  UZEMANYAG_TIPUSOK,
  VALTO_TIPUSOK,
} from '../constants';
import {SelectWrapped, styles} from '../components/Search';

const steps = ['Márka', 'Modell', 'Kép',
  'Ár', 'Év', 'Állapot', 'Kivitel',
  'Futásteljesítmény', 'Szín',
  'Tömeg', 'Üzemanyag',
  'Hengerűrtartalom', 'Teljesítmény',
  'Hajtás', 'Váltó', 'Leírás'];

class CarUploadPage extends Component {
  state = {
    activeStep: 0,
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
    selectedFiles: [],
  };

  handleNext = () => {
    const {activeStep} = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });
  };

  handleBack = () => {
    const {activeStep} = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  onSelectChange = (name) => (value) => {
    this.setState({[name]: value});
  };

  fileChangedHandler = (image) => {
    this.setState({selectedFiles: [...this.state.selectedFiles, image]});
  };

  uploadHandler = () => {
    for (const image of this.state.selectedFiles) {
      console.log(image[0]);
      const formData = new FormData();
      formData.append('upload_preset', UNSIGNED_UPLOAD_PRESET);
      formData.append('file', image[0]);
      this.props.uploadCarImage(formData);
    }
  };

  handleAddCar = (event) => {
    event.preventDefault();
    const {
      marka, modell, ar, ev, allapot, kivitel, km, szin, tomeg, uzemanyag, hengerUrtartalom,
      teljesitmeny, hajtas, valto, leiras,
    } = this.state;
    const car = {
      marka,
      modell,
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
    this.uploadHandler();
  };

  handleCancelButton = () => {
    this.props.history.goBack();
  };

  render() {
    const {
      activeStep, modell, marka, ar, ev,
      allapot, kivitel, km, szin, tomeg, uzemanyag,
      hengerUrtartalom, teljesitmeny, hajtas, valto, leiras,
    } = this.state;

    return (
      <Paper classes={{root: 'padding-side-small padding-big flex'}}>
        <form onSubmit={(e) => this.handleAddCar(e)} className="flex full-width vertical horizontal--center">
          {activeStep === 0 &&
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
          }

          {activeStep === 1 &&
          <TextField
            style={{width: '300px'}}
            autoFocus
            fullWidth
            required
            name="modell"
            label="Modell"
            value={modell}
            onChange={this.onChange}/>
          }

          {activeStep === 2 &&
          <ImageUploader
            withIcon={true}
            buttonText='Válasszon ki képeket'
            onChange={this.fileChangedHandler}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            buttonClassName='btn btn--primary'
            label='Minimum 4 kép és maximum 10 képet tölthet fel'
            labelClass='font-size-big'
            fileSizeError='Túl nagy a kép mérete! 5MB a maximum.'
            fileTypeError='Nem támogatott fájl formátum!'
            withPreview
          />
          }

          {activeStep === 3 &&
          <TextField
            style={{width: '300px'}}
            autoFocus
            fullWidth
            type="number"
            name="ar"
            label="Ár"
            value={ar}
            onChange={this.onChange}/>
          }

          {activeStep === 4 &&
          <TextField
            style={{width: '300px'}}
            autoFocus
            fullWidth
            required
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
          }

          {activeStep === 5 &&
          <TextField
            style={{width: '300px'}}
            autoFocus
            fullWidth
            required
            name="allapot"
            label="Állapot"
            value={allapot}
            onChange={this.onSelectChange('allapot')}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputComponent: SelectWrapped,
              inputProps: {
                instanceId: 'allapot',
                simpleValue: true,
                options: ALLAPOTOK,
              },
            }}
          />
          }

          {activeStep === 6 &&
          <TextField
            style={{width: '300px'}}
            autoFocus
            required
            fullWidth
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
          }

          {activeStep === 7 &&
          <TextField
            style={{width: '300px'}}
            autoFocus
            required
            fullWidth
            type="number"
            name="km"
            label="Km óra állása"
            value={km}
            onChange={this.onChange}/>
          }

          {activeStep === 8 &&
          <TextField
            style={{width: '300px'}}
            autoFocus
            required
            fullWidth
            name="szin"
            label="Szín"
            value={szin}
            onChange={this.onChange}/>
          }

          {activeStep === 9 &&
          <TextField
            style={{width: '300px'}}
            autoFocus
            required
            fullWidth
            type="number"
            name="tomeg"
            label="Tömeg"
            value={tomeg}
            onChange={this.onChange}/>
          }

          {activeStep === 10 &&
          <TextField
            style={{width: '300px'}}
            autoFocus
            required
            fullWidth
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
          }

          {activeStep === 11 &&
          <TextField
            style={{width: '300px'}}
            autoFocus
            required
            fullWidth
            type="number"
            name="hengerUrtartalom"
            label="Hengerűrtartalom"
            value={hengerUrtartalom}
            onChange={this.onChange}/>
          }

          {activeStep === 12 &&
          <TextField
            style={{width: '300px'}}
            autoFocus
            required
            fullWidth
            type="number"
            name="teljesitmeny"
            label="Teljesítmény"
            value={teljesitmeny}
            onChange={this.onChange}/>
          }

          {activeStep === 13 &&
          <TextField
            style={{width: '300px'}}
            autoFocus
            name="hajtas"
            label="Hajtás"
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
          }

          {activeStep === 14 &&
          <TextField
            style={{width: '300px'}}
            autoFocus
            name="valto"
            label="Váltó"
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
          }

          {activeStep === 15 &&
          <TextField
            style={{width: '300px'}}
            autoFocus
            fullWidth
            name="leiras"
            label="Leírás"
            value={leiras}
            multiline
            onChange={this.onChange}/>
          }

          {activeStep === steps.length - 1 ? (
            <div className="margin-big flex horizontal--center">
              <button className="btn btn--secondary margin-side-medium" onClick={this.handleCancelButton}>Mégse</button>
              <button className="btn btn--secondary margin-side-medium" type="submit">Létrehozás</button>
            </div>
          ) : (
            <div className="margin-big flex horizontal--center">
              {activeStep > 0 &&
              <a className="btn btn--secondary margin-side-medium" onClick={this.handleBack}>
                Vissza
              </a>
              }
              <a className="btn btn--primary margin-side-medium" onClick={this.handleNext}>
                Következő
              </a>
            </div>
          )}

          <MediaQuery minWidth={1000}>
            {activeStep !== steps.length &&
            <Stepper classes={{root: 'full-width'}} activeStep={activeStep} alternativeLabel>
              {steps.map(label => {
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>}
          </MediaQuery>
          <MediaQuery maxWidth={1000}>
            <div>
              {activeStep + 1} / {steps.length}
            </div>
          </MediaQuery>
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

export default connect(mapStateToProps, {
  addCar,
  uploadCarImage,
})(withStyles(styles)(CarUploadPage));