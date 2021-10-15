import React from 'react';

import { Alert, Container } from 'reactstrap';

const Prices = () => (
  <Container>
    <h1>Prices</h1>
    <p>Prices may differ according the day of the festival.</p>
    
    <Alert color="info">
        Attention! <strong>Children under 4 can go freely with you without any other fee!</strong>
    </Alert>

    <h2>Day one</h2>
    <p>Price: 5$</p>
    <p>Workshops: "Movies that changed the history of cinema"</p>
    <h2>Day Two</h2>
    <p>Price: 15$</p>
    <p>Workshops: "Actors that became legends"</p>
    <h2>Day three</h2>
    <p>Price: 10$</p>
    <p>Workshops: "What do you need to succeed in the movie industry"</p>
  </Container>
);

export default Prices;