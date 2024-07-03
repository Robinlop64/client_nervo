import React from 'react'
import { Formugeneral } from './Formugeneral'
import { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export const RegFotografia = () => {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [pais, setPais] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [institucion, setInstitucion] = useState("");
  const [ubicacionFisica, setUbicacionFisica] = useState("");
  const [anio, setAnio] = useState("");
  const [mes, setMes] = useState("");
  const [dia, setDia] = useState("");
  const [fechaAdquisicion, setFechaAdquisicion] = useState("");
  const [coleccion, setColeccion] = useState("");
  const [tipoBien, setTipoBien] = useState("");
  const [hallazgo, setHallazgo] = useState("");
  const [personaRegistra, setPersonaRegistra] = useState("");
  const [tipoFotografia, setTipoFotografia] = useState("");
  const [file,setFile] = useState("");
  const [empleadoslist,setEmpleados] = useState([])



  const [foto, setFoto] = useState("");
  const [numeroFoto, setNumeroFoto] = useState("");
  const [numeroAlbum, setNumeroAlbum] = useState("");
  const [formato, setFormato] = useState("");
  const [camara, setCamra] = useState("");
  const [descripcion, setDescripcion] = useState("");


 


  const handleSubmit = (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('file', file); // Asumiendo que 'file' es el archivo de imagen seleccionado
    formData.append('titulo', titulo);
    formData.append('autor', autor);
    formData.append('pais', pais);
    formData.append('ciudad', ciudad);
    formData.append('institucion', institucion);
    formData.append('ubicacionFisica', ubicacionFisica);
    formData.append('anio', anio);
    formData.append('mes', mes);
    formData.append('dia', dia);
    formData.append('fechaAdquisicion', fechaAdquisicion);
    formData.append('coleccion', coleccion);
    formData.append('tipoBien', tipoBien);
    formData.append('hallazgo', hallazgo);
    formData.append('personaRegistra', personaRegistra);
    formData.append('tipoFotografia', tipoFotografia);
  
    axios.post('http://localhost:3001/submit', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.error('Hubo un error al enviar los datos!', error);
    });
  };





  const getinfo = (event)=>{
    event.preventDefault();
    axios.get("http://localhost:3001/acervo2").then((response) => {
      setEmpleados(response.data);
      console.log(empleadoslist)



    })
  }





  return (
    <div>
        <main id='main2'>
            <div id="container2">
              <form onSubmit={getinfo}>
              <div>
      <h1>Formulario de registro de bienes</h1>
      <div id="barra">
        <div id="barraicon">
          <NavLink to="/registro">
            <button>Regresar</button>
          </NavLink>
        </div>
      </div>
      <h2>Campos generales</h2>
      <div id="camposgenerales">
        <form onSubmit={handleSubmit}>
          <div id="tituloyautor">
            <label>Título:</label>
            <input type="text" name="titulo" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
            <label>Autor:</label>
            <input type="text" name="autor" placeholder="Autor" value={autor} onChange={(e) => setAutor(e.target.value)} />
          </div>
          <div id="formpais">
            <label>País:</label>
            <input type="text" name="pais" placeholder="pais" value={pais} onChange={(e) => setPais(e.target.value)} />
            <label>Ciudad:</label>
            <select name="ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)}>
              <option value="">Seleccionar ciudad</option>
              <option value="CDMX">CDMX</option>
              <option value="Monterrey">Monterrey</option>
              <option value="Guadalajara">Guadalajara</option>
            </select>
            <label>Institución:</label>
            <select name="institucion" value={institucion} onChange={(e) => setInstitucion(e.target.value)}>
              <option value="">Seleccionar institución</option>
              <option value="UNAM">UNAM</option>
              <option value="IPN">IPN</option>
              <option value="ITESM">ITESM</option>
            </select>
          </div>
          <div id="formubi">
            <label>Ubicación física:</label>
            <select name="ubicacion_fisica" value={ubicacionFisica} onChange={(e) => setUbicacionFisica(e.target.value)}>
              <option value="">Seleccionar ubicación física</option>
              <option value="Biblioteca">Biblioteca</option>
              <option value="Archivo">Archivo</option>
              <option value="Museo">Museo</option>
            </select>
            <label>Fecha:</label>
            <input type="number" name="anio" placeholder="Año" value={anio} onChange={(e) => setAnio(e.target.value)} />
            <input type="number" name="mes" placeholder="Mes" value={mes} onChange={(e) => setMes(e.target.value)} />
            <input type="number" name="dia" placeholder="Día" value={dia} onChange={(e) => setDia(e.target.value)} />
            <label>Fecha de adquisición:</label>
            <input type="date" name="fecha_adquisicion" placeholder="Fecha de adquisición" value={fechaAdquisicion} onChange={(e) => setFechaAdquisicion(e.target.value)} />
            <label>Colección:</label>
            <select name="coleccion" value={coleccion} onChange={(e) => setColeccion(e.target.value)}>
              <option value="">Seleccionar la colección</option>
              <option value="Testimonio">Testimonio</option>
              <option value="Creación">Creación</option>
            </select>
            <label>Tipo de bien:</label>
            <select name="tipo_bien" value={tipoBien} onChange={(e) => setTipoBien(e.target.value)}>
              <option value="">Seleccionar el tipo de bien</option>
              <option value="Testimonio">Testimonio</option>
              <option value="Creación">Creación</option>
            </select>
            <label>Hallazgo:</label>
            <select name="hallazgo" value={hallazgo} onChange={(e) => setHallazgo(e.target.value)}>
              <option value="No">No</option>
              <option value="Sí">Sí</option>
            </select>
            <label>Persona que registra:</label>
            <select name="persona_registra" value={personaRegistra} onChange={(e) => setPersonaRegistra(e.target.value)}>
              <option value="Mayra Fonseca">Mayra Fonseca</option>
              <option value="Robin">Robin</option>
            </select>
          </div>
          <div id="esp1">
            <label>Foto:</label>
            <input type="file" id="fileInput" onChange={(e) => setFile(e.target.files[0])} name="image" />
            <label>Tipo de Fotografía:</label>
            <select name="tipo_fotografia" value={tipoFotografia} onChange={(e) => setTipoFotografia(e.target.value)}>
              <option value="">Seleccionar el tipo de fotografía</option>
              <option value="Retrato">Retrato</option>
            </select>
          </div>
          <button onClick={handleSubmit}>Enviar</button>
        </form>

        <div className='lista'>
          {
            empleadoslist.map((val,key) =>{
              return <div className='1'>{val.titulo}</div>
            })
          }

        </div>
      </div>
    </div>
                <h3>Campos específicos Fotografía</h3>
                <div id="esp1">
                    <label>Foto:</label>
                    <form action="/upload" method="post" enctype="multipart/form-data">
                    <input  type="number" placeholder="Número de foto"/>
                    </form>

                    <label>Número de foto:</label>
                    <input  type="number" placeholder="Número de foto"/>

                    <label>Número de álbum:</label>
                    <input  type="number" placeholder="Número de álbum"/>
                    
                    <label>Tipo de Fotografía:</label>             
                         <select>
                            <option value="Seleccionar el tipo de fotografía">Seleccionar el tipo de fotografía</option>
                            <option value="foto">tal</option>
                        </select>
                    <label>Formato:</label>
                    <input  type="text"/>
                    <label>Cámara:</label>
                    <input  type="text"/>
                    <label>Descripción</label>
                    <input  type="text" />
                    <button>Enviar</button>
                </div>
                </form>
                </div>
                </main>
    </div>
  )
}
