import React from 'react';

const cardStyle = {
  height: '300px',
  width: '250px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  border: '3px solid black',
  margin: '5px',
  padding: '10px',
  borderRadius: '3px',
};

const Card = props => (
  <div style={cardStyle}>
    <p>Character:</p>
    <h2>{props.name}</h2>
    {/* <p>Homeworld: </p>
    <h2>{props.homeworld.name}</h2>
    <br />
    <p>Film Appearances:</p>
    <p>{props.films.length}</p> */}
    <br />
  </div>
);

export default Card;
