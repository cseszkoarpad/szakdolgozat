import React from 'react';
import {Link} from 'react-router-dom';

const AutoCapture = ({kep, marka, modell, _id}) => {
  return (
    <Link className="auto" to={`/autos/${_id}`}>
      <img className="img-auto"
           src={kep ? kep : 'http://maestroselectronics.com/wp-content/uploads/2017/12/No_Image_Available.jpg'}
           alt={`${marka}-${modell}`}/>
      <h6 className="title-auto">{marka} - {modell}</h6>
    </Link>
  );
};

export default AutoCapture;