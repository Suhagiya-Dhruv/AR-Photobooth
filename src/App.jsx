import React, { useState } from 'react';
import Landing from './LandingPage';
import SelectPlayer from './SelectPlayer';

const App = () => {

  const [start, setStart] = useState(false);

  return (
    start ?
      <SelectPlayer />
      :
      <Landing setStart={setStart} />
  );
};

export default App;
