import React, {Component} from 'react';
import uniqid from 'uniqid';
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
  EVJARATOK,
  HAJTAS_TIPUSOK,
  KIVITELEK,
  MARKAK,
  UNSIGNED_UPLOAD_PRESET,
  UZEMANYAG_TIPUSOK,
  VALTO_TIPUSOK,
} from '../constants';
import {SelectWrapped, styles} from '../components/Search';
import Loader from '../components/Loader';

const steps = ['Márka', 'Modell', 'Kép',
  'Ár', 'Év', 'Kivitel',
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
    loading: false,
  };

  handleNext = (event) => {
    event.preventDefault();
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

  uploadHandler = (car) => {
    const {selectedFiles} = this.state;
    selectedFiles[selectedFiles.length - 1].forEach((image, index) => {
      const formData = new FormData();
      formData.append('upload_preset', UNSIGNED_UPLOAD_PRESET);
      formData.append('file', image);
      if (index === 0) {
        this.props.addCar(car, formData);
      }
      this.props.uploadCarImage(formData, car.id);
    });
    setTimeout(() => {
      this.props.history.push(`/cars/${car.id}`);
    }, 5000);
  };

  handleAddCar = (event) => {
    event.preventDefault();
    const {selectedFiles} = this.state;
    if (selectedFiles[selectedFiles.length - 1].length < 4 || selectedFiles[selectedFiles.length - 1].length > 10) {
      return this.setState({activeStep: 2});
    }
    const {
      marka, modell, ar, ev, kivitel, km, szin, tomeg, uzemanyag, hengerUrtartalom,
      teljesitmeny, hajtas, valto, leiras,
    } = this.state;
    const id = uniqid();

    const car = {
      id,
      marka,
      modell,
      ar,
      ev,
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
    this.setState({loading: true});
    this.uploadHandler(car);
  };

  handleCancelButton = () => {
    this.props.history.goBack();
  };

  renderStepButtons = () =>
    (
      <div className="upload-step-buttons-wrapper">
        <button type="submit" className="btn btn--primary margin-side-medium">
          Következő
        </button>
        <button className="btn btn--secondary margin-side-medium" onClick={this.handleBack}>
          Vissza
        </button>
      </div>
    );

  render() {
    const {
      activeStep, modell, marka, ar, ev,
      kivitel, km, szin, tomeg, uzemanyag,
      hengerUrtartalom, teljesitmeny, hajtas, valto, leiras,
      loading,
    } = this.state;

    if (!loading) {
      return (
        <Paper classes={{root: 'flex vertical vertical--center padding-side-big padding-big flex'}}>
          {activeStep === 0 &&
          <form onSubmit={(e) => this.handleNext(e)} className="flex full-width vertical vertical--center margin-big">
            <TextField
              style={{width: '300px', marginTop: '50px'}}
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
            <div className="margin-big flex horizontal--center">
              <button type="submit" className="btn btn--primary margin-side-medium">
                Következő
              </button>
            </div>
          </form>
          }

          {activeStep === 1 &&
          <form onSubmit={(e) => this.handleNext(e)} className="flex full-width vertical vertical--center margin-big">
            <TextField
              style={{width: '300px', marginTop: '50px'}}
              autoFocus
              fullWidth
              required
              name="modell"
              label="Modell"
              value={modell}
              onChange={this.onChange}
            />
            {this.renderStepButtons()}
          </form>
          }

          {activeStep === 2 &&
          <form onSubmit={(e) => this.handleNext(e)} className="flex full-width vertical vertical--center margin-big">
            <ImageUploader
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
            />
            {this.renderStepButtons()}
          </form>
          }

          {activeStep === 3 &&
          <form onSubmit={(e) => this.handleNext(e)} className="flex full-width vertical vertical--center margin-big">
            <TextField
              style={{width: '300px', marginTop: '50px'}}
              autoFocus
              fullWidth
              type="number"
              name="ar"
              label="Ár"
              value={ar}
              onChange={this.onChange}
            />
            {this.renderStepButtons()}
          </form>
          }

          {activeStep === 4 &&
          <form onSubmit={(e) => this.handleNext(e)} className="flex full-width vertical vertical--center margin-big">
            <TextField
              style={{width: '300px', marginTop: '50px'}}
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
            {this.renderStepButtons()}
          </form>
          }

          {activeStep === 5 &&
          <form onSubmit={(e) => this.handleNext(e)} className="flex full-width vertical vertical--center margin-big">
            <TextField
              style={{width: '300px', marginTop: '50px'}}
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
            {this.renderStepButtons()}
          </form>
          }

          {activeStep === 6 &&
          <form onSubmit={(e) => this.handleNext(e)} className="flex full-width vertical vertical--center margin-big">
            <TextField
              style={{width: '300px', marginTop: '50px'}}
              autoFocus
              required
              fullWidth
              type="number"
              name="km"
              label="Km óra állása"
              value={km}
              onChange={this.onChange}
            />
            {this.renderStepButtons()}
          </form>
          }

          {activeStep === 7 &&
          <form onSubmit={(e) => this.handleNext(e)} className="flex full-width vertical vertical--center margin-big">
            <TextField
              style={{width: '300px', marginTop: '50px'}}
              autoFocus
              required
              fullWidth
              name="szin"
              label="Szín"
              value={szin}
              onChange={this.onChange}
            />
            {this.renderStepButtons()}
          </form>
          }

          {activeStep === 8 &&
          <form onSubmit={(e) => this.handleNext(e)} className="flex full-width vertical vertical--center margin-big">
            <TextField
              style={{width: '300px', marginTop: '50px'}}
              autoFocus
              required
              fullWidth
              type="number"
              name="tomeg"
              label="Tömeg"
              value={tomeg}
              onChange={this.onChange}
            />
            {this.renderStepButtons()}
          </form>
          }

          {activeStep === 9 &&
          <form onSubmit={(e) => this.handleNext(e)} className="flex full-width vertical vertical--center margin-big">
            <TextField
              style={{width: '300px', marginTop: '50px'}}
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
            {this.renderStepButtons()}
          </form>
          }

          {activeStep === 10 &&
          <form onSubmit={(e) => this.handleNext(e)} className="flex full-width vertical vertical--center margin-big">
            <TextField
              style={{width: '300px', marginTop: '50px'}}
              autoFocus
              required
              fullWidth
              type="number"
              name="hengerUrtartalom"
              label="Hengerűrtartalom"
              value={hengerUrtartalom}
              onChange={this.onChange}
            />
            {this.renderStepButtons()}
          </form>
          }

          {activeStep === 11 &&
          <form onSubmit={(e) => this.handleNext(e)} className="flex full-width vertical vertical--center margin-big">
            <TextField
              style={{width: '300px', marginTop: '50px'}}
              autoFocus
              required
              fullWidth
              type="number"
              name="teljesitmeny"
              label="Teljesítmény"
              value={teljesitmeny}
              onChange={this.onChange}
            />
            {this.renderStepButtons()}
          </form>
          }

          {activeStep === 12 &&
          <form onSubmit={(e) => this.handleNext(e)} className="flex full-width vertical vertical--center margin-big">
            <TextField
              style={{width: '300px', marginTop: '50px'}}
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
            {this.renderStepButtons()}
          </form>
          }

          {activeStep === 13 &&
          <form onSubmit={(e) => this.handleNext(e)} className="flex full-width vertical vertical--center margin-big">
            <TextField
              style={{width: '300px', marginTop: '50px'}}
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
            {this.renderStepButtons()}
          </form>
          }

          {activeStep === 14 &&
          <form onSubmit={(e) => this.handleNext(e)} className="flex full-width vertical vertical--center margin-big">
            <TextField
              style={{width: '600px'}}
              autoFocus
              fullWidth
              name="leiras"
              label="Leírás"
              value={leiras}
              multiline
              onChange={this.onChange}
            />
            {this.renderStepButtons()}
          </form>
          }

          {activeStep === steps.length && (
            <div className="margin-big flex horizontal--center">
              <button className="btn btn--secondary margin-side-medium"
                      onClick={this.handleCancelButton}>Mégse
              </button>
              <button className="btn btn--primary margin-side-medium"
                      onClick={this.handleAddCar}>Létrehozás
              </button>
            </div>
          )}

          <MediaQuery minWidth={1000}>
            {activeStep !== steps.length &&
            <Stepper classes={{root: 'full-width margin-big'}} activeStep={activeStep} alternativeLabel>
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
        </Paper>
      );
    }
    else {
      return <Loader/>;
    }
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