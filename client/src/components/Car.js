import React from 'react';
import {Link} from 'react-router-dom';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const Car = ({kep, marka, modell, id}) => (
  <GridListTile key={id}>
    <Link className="car" to={`/cars/${id}`}>
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