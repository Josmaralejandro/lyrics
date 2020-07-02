import React, { useState, useEffect, Fragment } from 'react';
import Formulario from './components/Formulario';
import Cancion from './components/Cancion';
import axios from 'axios';
import Informacion from './components/Informacion';

function App() {

  const [artista, agregarArtista] = useState('');
  const [letra, agregarLetra] = useState([]);
  const [info, agregarInfo] = useState({});

  //Método para consultar la API de letras de canciones
  const consultarAPILetra = async (busqueda) => {
    const {artista, cancion} = busqueda;

    const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;

    //Consultar la API
    const resultado = await axios(url);

    //Almacenar el artista que se buscó
    agregarArtista(artista);

    //Almacenar la letra en el state
    agregarLetra(resultado.data.lyrics);
  }

  //Metodo para consultar la API de información
  const consultarAPIInfo = async () => {
    if(artista){
      const url = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      const resultado = await axios(url);
      
      agregarInfo(resultado.data.artists[0]);
    }
  }

  useEffect(() => {
    consultarAPIInfo();
  }, [artista])

  return (
    <Fragment>
      <Formulario
        consultarAPILetra={consultarAPILetra}
      />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Informacion
              info={info}
            />
          </div>
          <div className="col-md-6">
            <Cancion
              letra={letra}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
