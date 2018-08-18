import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addCar, uploadCarImage} from '../actions/car';
import Button from '@material-ui/core/Button';
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

function getSteps() {
  return ['Márka', 'Modell', 'Kép',
    'Ár', 'Év', 'Állapot', 'Kivitel',
    'Futásteljesítmény', 'Szín',
    'Tömeg', 'Üzemanyag',
    'Hengerűrtartalom', 'Teljesítmény',
    'Hajtás', 'Váltó', 'Leírás'];
}

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

  fileChangedHandler = (event) => {
    this.setState({selectedFiles: [...this.state.selectedFiles, event.target.files[0]]});
  };

  uploadHandler = () => {
    for (const image of this.state.selectedFiles) {
      const formData = new FormData();
      formData.append('upload_preset', UNSIGNED_UPLOAD_PRESET);
      formData.append('file', image);
      this.props.uploadCarImage(formData);
    }
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
    //  this.props.history.push(`/`);
  };

  handleCancelButton = () => {
    this.props.history.goBack();
  };

  render() {
    const {
      activeStep, kep, modell, marka, ar, ev,
      allapot, kivitel, km, szin, tomeg, uzemanyag,
      hengerUrtartalom, teljesitmeny, hajtas, valto, leiras,
    } = this.state;
    const steps = getSteps();

    return (
      <Paper>
        <form onSubmit={this.handleAddCar}>
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
          <div>
            <input type="file" onChange={this.fileChangedHandler}/>
            <button onClick={this.uploadHandler}>Upload!</button>
          </div>
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
            <div>
              <Button onClick={this.handleCancelButton}>Mégse</Button>
              <Button type="submit">Létrehozás</Button>
            </div>
          ) : (
            <div>
              {activeStep > 0 &&
              <button className="btn btn--secondary" onClick={this.handleBack}>
                Vissza
              </button>
              }
              <button className="btn btn--primary" onClick={this.handleNext}>
                Következő
              </button>
            </div>
          )}
          {window.innerWidth > 1350 && activeStep !== steps.length &&
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(label => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>}
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