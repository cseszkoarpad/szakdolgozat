import React from 'react';
import {Link} from 'react-router-dom';


//TODO
const NotFoundPage = () => {
  return (
    <div>
      <p>Ez az oldal nem létezik.</p>
      <Link to="/">Vissza</Link>
    </div>
  );
};

export default NotFoundPage;