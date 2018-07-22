import React from 'react';
import {Link} from 'react-router-dom';

const Car = ({kep, marka, modell, _id}) => {
  return (
    <Link className="car" to={`/cars/${_id}`}>
      <img className="img-car"
           src={kep ? kep : 'http://maestroselectronics.com/wp-content/uploads/2017/12/No_Image_Available.jpg'}
           alt={`${marka}-${modell}`}/>
      <h6 className="title-car">{marka} - {modell}</h6>
    </Link>
  );
};

export default Car;