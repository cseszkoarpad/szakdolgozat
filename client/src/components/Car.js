import React from 'react';
import {Link} from 'react-router-dom';
import GridListTile from '@material-ui/core/es/GridListTile/GridListTile';
import GridListTileBar from '@material-ui/core/es/GridListTileBar/GridListTileBar';
import IconButton from '@material-ui/core/es/IconButton/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const Car = ({kep, marka, modell, _id}) => (
  <GridListTile key={_id}>
    <Link className="car" to={`/cars/${_id}`}>
      <img src={kep ? kep : 'http://maestroselectronics.com/wp-content/uploads/2017/12/No_Image_Available.jpg'}
           alt={`${marka}-${modell}`}/>
      <GridListTileBar
        title={marka}
        subtitle={<span>{modell}</span>}
        actionIcon={
          <IconButton>
            <InfoIcon/>
          </IconButton>
        }
      />
    </Link>
  </GridListTile>
);

export default Car;