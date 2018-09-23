import React from 'react';
import {Link} from 'react-router-dom';

const CarCapture = ({
                      preview_url, marka, modell, ev, id, ar, leiras, km, kivitel,
                      szin, tomeg, uzemanyag, hengerUrtartalom, teljesitmeny,
                    }) =>
  (
    <Link className="user-car-capture" to={`/cars/${id}`}>
      <div className="capture-header">
        <h4 className="capture-title">{marka} - {modell} ({ev})</h4>
        <span className="capture-price">{ar.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')} Ft</span>
      </div>
      <div className="capture-body">
        <img className="capture-image" src={preview_url} alt={`${marka}-${modell}-${id}`}/>
        <div className="capture-info-wrapper">
          <span className="capture-body-attributes">{km} km, {kivitel}, {szin}, {tomeg} kg, {uzemanyag}, {hengerUrtartalom} cc, {teljesitmeny} le</span>
          <p className="capture-body-text">{leiras}</p>
        </div>
      </div>
    </Link>
  );

export default CarCapture;