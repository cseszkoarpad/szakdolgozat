import React, {Component} from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {search} from '../actions/car';
import {MARKAK, KIVITELEK, UZEMANYAG_TIPUSOK} from '../constants';
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
import {withStyles} from '@material-ui/core';

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
          fontWeight: isSelected ? 500 : 400,
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

const ITEM_HEIGHT = 48;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  '@global': {
    '.Select-control': {
      display: 'flex',
      alignItems: 'center',
      border: 0,
      height: 'auto',
      background: 'transparent',
      '&:hover': {
        boxShadow: 'none',
      },
    },
    '.Select-multi-value-wrapper': {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
    },
    '.Select--multi .Select-input': {
      margin: 0,
    },
    '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
      padding: 0,
    },
    '.Select-noresults': {
      padding: theme.spacing.unit * 2,
    },
    '.Select-input': {
      display: 'inline-flex !important',
      padding: 0,
      height: 'auto',
    },
    '.Select-input input': {
      background: 'transparent',
      border: 0,
      padding: 0,
      cursor: 'default',
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      margin: 0,
      outline: 0,
    },
    '.Select-placeholder, .Select--single .Select-value': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(16),
      padding: 0,
    },
    '.Select-placeholder': {
      opacity: 0.42,
      color: theme.palette.common.black,
    },
    '.Select-menu-outer': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: 'absolute',
      left: 0,
      top: `calc(100% + ${theme.spacing.unit}px)`,
      width: '100%',
      zIndex: 2,
      maxHeight: ITEM_HEIGHT * 4.5,
    },
    '.Select.is-focused:not(.is-open) > .Select-control': {
      boxShadow: 'none',
    },
    '.Select-menu': {
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: 'auto',
    },
    '.Select-menu div': {
      boxSizing: 'content-box',
    },
    '.Select-arrow-zone, .Select-clear-zone': {
      color: theme.palette.action.active,
      cursor: 'pointer',
      height: 21,
      width: 21,
      zIndex: 1,
    },
    // Only for screen readers. We can't use display none.
    '.Select-aria-only': {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      margin: -1,
    },
  },
});

class Search extends Component {
  state = {
    marka: '',
    kivitel: null,
    uzemanyag: null,
  };

  onChange = (name) => (value) => {
    this.setState({[name]: value});
    console.log(this.state.uzemanyag);
  };

  handleSearch = () => {
    const {marka, kivitel, uzemanyag} = this.state;
    const data = {
      marka,
      kivitel,
      uzemanyag,
    };
    this.props.search(data);
  };

  render() {
    const {marka, kivitel, uzemanyag} = this.state;
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
              shrink: true,
            }}
            InputProps={{
              inputComponent: SelectWrapped,
              inputProps: {
                instanceId: 'kivitel',
                multi: true,
                simpleValue: true,
                options: KIVITELEK,
              },
            }}
          />
        </div>
        <div className="field">
          <TextField
            fullWidth
            value={uzemanyag}
            onChange={this.onChange('uzemanyag')}
            name="uzemanyag"
            label="Üzemanyag"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputComponent: SelectWrapped,
              inputProps: {
                instanceId: 'uzemanyag',
                multi: true,
                simpleValue: true,
                options: UZEMANYAG_TIPUSOK,
              },
            }}
          />
        </div>
        <div className="submit-button">
          <Button type="submit" variant="contained" color="primary">Keresés</Button>
        </div>
      </form>
    );
  }
}

function mapStateToProps({cars}) {
  return {
    cars,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    search,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Search));