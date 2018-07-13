import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/auto.css';

const Auto = ({kep, marka, modell, _id}) => {
  return (
    <div className="auto">
      <Link to={`/autos/${_id}`}>
        <img className="img-auto"
             src={kep ? kep : 'http://maestroselectronics.com/wp-content/uploads/2017/12/No_Image_Available.jpg'}
             alt={`${marka}-${modell}`}/>
        <h6 className="title-auto">{marka} - {modell}</h6>
      </Link>
    </div>
  );
};

export default Auto;