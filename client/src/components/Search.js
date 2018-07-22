import React, {Component} from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {search} from '../actions/car';
import {MARKAK, KIVITELEK} from '../constants';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClearIcon from '@material-ui/icons/Clear';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import 'react-select/dist/react-select.css';

class Option extends React.Component {
  handleClick = event => {
    this.props.onSelect(this.props.option, event);
  };

  render() {
    const {children, isFocused, isSelected, onFocus} = this.props;

    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400
        }}
      >
        {children}
      </MenuItem>
    );
  }
}

function SelectWrapped(props) {
  const {classes, ...other} = props;

  return (
    <Select
      optionComponent={Option}
      noResultsText={<Typography>{'No results found'}</Typography>}
      arrowRenderer={arrowProps => {
        return arrowProps.isOpen ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>;
      }}
      clearRenderer={() => <ClearIcon/>}
      valueComponent={valueProps => {
        const {value, children, onRemove} = valueProps;

        const onDelete = event => {
          event.preventDefault();
          event.stopPropagation();
          onRemove(value);
        };

        if (onRemove) {
          return (
            <Chip
              tabIndex={-1}
              label={children}
              className={classes.chip}
              deleteIcon={<CancelIcon onTouchEnd={onDelete}/>}
              onDelete={onDelete}
            />
          );
        }

        return <div className="Select-value">{children}</div>;
      }}
      {...other}
    />
  );
}

class Search extends Component {
  state = {
    marka: '',
    kivitel: ''
  };

  onChange = (name) => (value) => {
    this.setState({[name]: value});
  };

  handleSearch = () => {
    const {marka, kivitel} = this.state;
    const data = {
      marka,
      kivitel
    };
    this.props.search(data);
  };

  render() {
    const {marka, kivitel} = this.state;
    return (
      <form onSubmit={this.handleSearch}>
        <div className="field">
          <TextField
            fullWidth
            value={marka}
            onChange={this.onChange('marka')}
            placeholder="Válasszon márkát."
            name="marka"
            label="Márka"
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              inputComponent: SelectWrapped,
              inputProps: {
                instanceId: 'marka',
                simpleValue: true,
                options: MARKAK
              }
            }}
          />
        </div>
        <div className="field">
          <TextField
            fullWidth
            value={kivitel}
            onChange={this.onChange('kivitel')}
            placeholder="Válasszon kivitelt."
            name="kivitel"
            label="Kivitel"
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              inputComponent: SelectWrapped,
              inputProps: {
                instanceId: 'kivitel',
                simpleValue: true,
                options: KIVITELEK
              }
            }}
          />
        </div>
        <div className="submit-button">
          <Button variant="contained" color="primary">Keresés</Button>
        </div>
      </form>
    );
  }
}

function mapStateToProps({cars}) {
  return {
    cars
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    search
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);