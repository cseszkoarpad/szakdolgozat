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
import {ALLAPOTOK, HAJTAS_TIPUSOK, KIVITELEK, MARKAK, UZEMANYAG_TIPUSOK, VALTO_TIPUSOK} from '../constants';
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
    const {
      activeStep, kep, modell, marka, ar, ev,
      allapot, kivitel, km, szin, tomeg, uzemanyag,
      hengerUrtartalom, teljesitmeny, hajtas, valto, leiras,
    } = this.state;
    const steps = getSteps();
    const {classes} = this.props;

    return (
      <Paper>
        <form onSubmit={(e) => this.handleAddCar(e)}>
          {activeStep === 0 &&
          <div style={{padding: '50px'}}>
            <TextField
              required
              fullWidth
              name="marka"
              label="Márka"
              value={marka}
              placeholder="Márka kiválasztása"
              onChange={this.onChange}
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

          {activeStep === 1 && <TextField
            fullWidth
            name="modell"
            label="Modell"
            value={modell}
            onChange={this.onChange}/>}

          {activeStep === 2 && <TextField
            fullWidth
            name="kep"
            label="Kép url"
            value={kep}
            onChange={this.onChange}/>}

          {activeStep === 3 && <TextField
            fullWidth
            type="number"
            name="ar"
            label="Ár"
            value={ar}
            onChange={this.onChange}/>}

          {activeStep === 4 && <TextField
            fullWidth
            type="date"
            name="ev"
            label="Évjárat"
            value={ev}
            onChange={this.onChange}
            InputLabelProps={{
              shrink: true,
            }}/>
          }

          {activeStep === 5 && <TextField
            name="allapot"
            label="Állapot"
            value={allapot}
            onChange={this.onChange}
            required
            fullWidth
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
          />}

          {activeStep === 6 && <TextField
            name="kivitel"
            label="Kivitel"
            value={kivitel}
            onChange={this.onChange}
            required
            fullWidth
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
          />}

          {activeStep === 7 && <TextField
            type="number"
            name="km"
            label="Km óra állása"
            value={km}
            onChange={this.onChange}/>}

          {activeStep === 8 && <TextField
            name="szin"
            label="Szín"
            value={szin}
            onChange={this.onChange}/>}

          {activeStep === 9 && <TextField
            type="number"
            name="tomeg"
            label="Tömeg"
            value={tomeg}
            onChange={this.onChange}/>}

          {activeStep === 10 && <TextField
            name="uzemanyag"
            label="Üzemanyag"
            value={uzemanyag}
            onChange={this.onChange}
            required
            fullWidth
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
          />}

          {activeStep === 11 && <TextField
            type="number"
            name="hengerUrtartalom"
            label="Hengerűrtartalom"
            value={hengerUrtartalom}
            onChange={this.onChange}/>}

          {activeStep === 12 && <TextField
            type="number"
            name="teljesitmeny"
            label="Teljesítmény"
            value={teljesitmeny}
            onChange={this.onChange}/>}

          {activeStep === 13 && <TextField
            name="hajtas"
            label="Hajtás"
            value={hajtas}
            onChange={this.onChange}
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
          />}

          {activeStep === 14 && <TextField
            name="valto"
            label="Váltó"
            value={valto}
            onChange={this.onChange}
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
          />}

          {activeStep === 15 && <TextField
            name="leiras"
            label="Leírás"
            value={leiras}
            multiline={true}
            onChange={this.onChange}/>}

          {this.state.activeStep === steps.length ? (
            <div>
              <p className="info">A feltöltés 1 creditbe kerül.</p>
              <p className="info">Crediteinek száma: {this.props.auth.credits ? this.props.auth.credits : '0'}</p>
              <Button type="submit">Létrehozás</Button>
              <Button onClick={this.handleCancelButton}>Mégse</Button>
            </div>
          ) : (
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
              <Button
                disabled={activeStep === 0}
                onClick={this.handleBack}
                className={classes.backButton}
              >
                Vissza
              </Button>
              <Button variant="contained" color="primary" onClick={this.handleNext}>
                {activeStep === steps.length - 1 ? 'Kész' : 'Következő'}
              </Button>
            </div>
          )}
          {window.innerWidth > 1350 && <Stepper activeStep={activeStep} alternativeLabel>
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