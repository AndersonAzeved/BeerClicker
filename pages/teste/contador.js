/*
import React, { useEffect, useState } from "react";

const MyComponent = () => {
    const [cont, setCont] = useState(0)
  useEffect(() => {
    
    setInterval(() => {
        setCont(cont + 3)
      // Atualiza o componente
    }, 3000);
  }, [cont]);

  return (
    <div>
        <title>{cont}</title>
      Componente atualizado a cada um segundo {cont}
      <input></input>
    </div>
  );
};

export default MyComponent;
*/

// components/Atualizador.js
import React, { useState, useEffect } from 'react';

const Atualizador = () => {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    // Define um intervalo de 1000 milissegundos (1 segundo)
    const intervalId = setInterval(() => {
      // Atualiza o estado do contador a cada segundo
      setContador((prevContador) => prevContador + 1);
    }, 1000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []); // O segundo parâmetro vazio [] garante que o useEffect seja executado apenas uma vez (montagem do componente)

  return (
    <div>
      <p>Contador: {contador}</p>
    </div>
  );
};

export default Atualizador;
