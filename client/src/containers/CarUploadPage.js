import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addCar, deleteCar, updateCar} from '../actions/car';
import '../styles/carDetails.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import {withStyles} from '@material-ui/core';
import {ALLAPOTOK, EVJARATOK, HAJTAS_TIPUSOK, KIVITELEK, MARKAK, UZEMANYAG_TIPUSOK, VALTO_TIPUSOK} from '../constants';
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
    console.log(car);
    this.props.addCar(car);
    this.props.history.push(`/`);
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
        <form onSubmit={(e) => this.handleAddCar(e)}>
          {activeStep === 0 &&
          <div style={{
            paddingTop: '150px',
            paddingBottom: '40px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
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
          </div>}

          {activeStep === 1 &&
          <div style={{
            paddingTop: '100px',
            paddingBottom: '40px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
            <TextField
              style={{width: '300px'}}
              autoFocus
              fullWidth
              required
              name="modell"
              label="Modell"
              value={modell}
              onChange={this.onChange}/>
          </div>
          }

          {activeStep === 2 &&
          <div style={{
            paddingTop: '100px',
            paddingBottom: '40px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
            <TextField
              style={{width: '300px'}}
              autoFocus
              fullWidth
              required
              name="kep"
              label="Kép url"
              value={kep}
              onChange={this.onChange}/>
          </div>
          }

          {activeStep === 3 &&
          <div style={{
            paddingTop: '100px',
            paddingBottom: '40px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
            <TextField
              style={{width: '300px'}}
              autoFocus
              fullWidth
              type="number"
              name="ar"
              label="Ár"
              value={ar}
              onChange={this.onChange}/>
          </div>
          }

          {activeStep === 4 &&
          <div style={{
            paddingTop: '100px',
            paddingBottom: '40px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
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
          </div>
          }

          {activeStep === 5 &&
          <div style={{
            paddingTop: '100px',
            paddingBottom: '40px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
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
          </div>
          }

          {activeStep === 6 &&
          <div style={{
            paddingTop: '100px',
            paddingBottom: '40px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
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
          </div>
          }

          {activeStep === 7 &&
          <div style={{
            paddingTop: '100px',
            paddingBottom: '40px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
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
          </div>
          }

          {activeStep === 8 &&
          <div style={{
            paddingTop: '100px',
            paddingBottom: '40px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
            <TextField
              style={{width: '300px'}}
              autoFocus
              required
              fullWidth
              name="szin"
              label="Szín"
              value={szin}
              onChange={this.onChange}/>
          </div>
          }

          {activeStep === 9 &&
          <div style={{
            paddingTop: '100px',
            paddingBottom: '40px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
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
          </div>
          }

          {activeStep === 10 &&
          <div style={{
            paddingTop: '100px',
            paddingBottom: '40px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
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
          </div>
          }

          {activeStep === 11 &&
          <div style={{
            paddingTop: '100px',
            paddingBottom: '40px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
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
          </div>
          }

          {activeStep === 12 &&
          <div style={{
            paddingTop: '100px',
            paddingBottom: '40px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
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
          </div>
          }

          {activeStep === 13 &&
          <div style={{
            paddingTop: '100px',
            paddingBottom: '40px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
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
          </div>
          }

          {activeStep === 14 &&
          <div style={{
            paddingTop: '100px',
            paddingBottom: '40px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
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
          </div>
          }

          {activeStep === 15 &&
          <div style={{
            paddingTop: '100px',
            paddingBottom: '40px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
            <TextField
              style={{width: '300px'}}
              autoFocus
              fullWidth
              name="leiras"
              label="Leírás"
              value={leiras}
              multiline={true}
              onChange={this.onChange}/>
          </div>
          }

          {this.state.activeStep === steps.length ? (
            <div style={{
              paddingTop: '100px',
              paddingBottom: '40px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
              <p className="info">A feltöltés 1 creditbe kerül.</p>
              <p className="info">Crediteinek száma: {this.props.auth.credits ? this.props.auth.credits : '0'}</p>
              <Button type="submit">Létrehozás</Button>
              <Button onClick={this.handleCancelButton}>Mégse</Button>
            </div>
          ) : (
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '80px', paddingBottom: '50px'}}>
              <Button
                disabled={activeStep === 0}
                onClick={this.handleBack}
                style={{marginRight: '20px'}}
              >
                Vissza
              </Button>
              <Button variant="contained" color="primary" onClick={this.handleNext}>
                {activeStep === steps.length - 1 ? 'Kész' : 'Következő'}
              </Button>
            </div>
          )}
          {window.innerWidth > 1350 && this.state.activeStep !== steps.length &&
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

const mapStateToProps = ({auth, cars}) => {
  return {
    auth,
    cars,
  };
};

export default connect(mapStateToProps, {updateCar, deleteCar, addCar})(withStyles(styles)(CarUploadPage));