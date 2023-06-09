import React, { useState } from 'react';

const WelcomeScreen = () => {
  const [name, setName] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar acciones adicionales con el nombre ingresado, como enviarlo a la base de datos
  };

  return (
    <div>
      <h1>Bienvenido(a)</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default WelcomeScreen;
