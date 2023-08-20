//after clicking rfc we will got the staring of the page
import React from 'react';
import Notes from './Notes';

export const  Home = (props) => {
  const {showAlert} = props;
  return (
    <div>
      <Notes showAlert={showAlert}/>
    </div>
  )
}
