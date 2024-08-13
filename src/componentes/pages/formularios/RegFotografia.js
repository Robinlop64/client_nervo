import React from 'react'
import { Formugeneral } from './Formugeneral'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useForm } from '../../../hooks/useForm';
import { Api } from '../../../hooks/Api';



export const RegFotografia = () => {
  const { formulario, enviado, cambiado, resetFormulario } = useForm({})
  const [resultado, setResultado] = useState(false)
  const [fileName, setFileName] = useState('');
  const [paises, setPaises] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [instituciones, setInstituciones] = useState([]);
  const [selectedPais, setSelectedPais] = useState('');
  const [selectedCiudad, setSelectedCiudad] = useState('');
  const [saved, setSaved] = useState('not sended');
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const url = `https://backend-prueba-apel.onrender.com/api/instituciones/listar/todo`;
      try {
        const response = await fetch(url, {
          method: "GET"
        });
        const result = await response.json();
        if (result.status === "success") {
          setData(result.data);
          setPaises(Object.keys(result.data));
        } else {
          // Manejo de error
          console.error("Error al obtener los datos", result.message);
        }
      } catch (error) {
        console.error("Error al realizar la petición", error);
      }
    };
    fetchData();
  }, []);

 useEffect(()=>{
  setSaved("")
 },[formulario])

  useEffect(() => {
    
    if (formulario.pais) {
      const ciudades = Object.keys(data[formulario.pais]);
      setCiudades(ciudades);
      if (ciudades.length === 1) {
        setSelectedCiudad(ciudades[0]);

      } else {
        setSelectedCiudad('');
        setInstituciones([]);
      }
    }
  }, [formulario.pais]);

  useEffect(() => {
    if (formulario.ciudad && formulario.pais) {
      const instituciones = data[formulario.pais][formulario.ciudad];
      setInstituciones(instituciones);
    }
  }, [formulario.ciudad]);



  const guardar_foto = async (e) => {
        e.preventDefault();
        let nueva_foto = formulario;
        const { datos } = await Api("https://backend-prueba-apel.onrender.com/api/fotografia/registrar-foto", "POST", nueva_foto);
        console.log(nueva_foto)
        if (datos.status === "successs") {
            console.log("status success")
            const fileInput = document.querySelector("#file");
            const formData = new FormData();
            Array.from(fileInput.files).forEach((file, index) => {
                formData.append(`files`, file);
            });
            console.log("formdata",formData)
            const { subida2 } = await Api(`https://backend-prueba-apel.onrender.com/api/fotografia/registrar-imagen/${datos.articuloGuardado._id}`, "POST", formData, true);
            const { subida } = await Api(`https://backend-google-fnsu.onrender.com/api/fotografia/registrar-imagen/${datos.articuloGuardado._id}`, "POST", formData, true);

            setResultado(true);
            setSaved("saved");
        } else {
            console.log("status error")
            setSaved("error");
        }
    };



  return (
    <div>
      <main className='main_registro'>
        <div className='contenedor_formulario_foto'>

          <div>

            <h1>Formulario de registro de bienes</h1>


            <div className='frame_botones_registro' id="regresar_boton">
              <NavLink to="/registro">
                <button className="button">Regresar</button>
              </NavLink>
            </div>
            <form onSubmit={guardar_foto}>
              <h2>Campos generales</h2>

              <div className='divisor_form'>

                <div className="form-group">
                  <label>Título:</label>
                  <input type="textarea" name="titulo" placeholder="Título" value={formulario.titulo || ''} onChange={cambiado} />
                </div>

                <div className="form-group" id='autor'>
                  <label>Autor:</label>
                  <input type="text" className='autor' name="autor" placeholder="Autor" value={formulario.autor || ''} onChange={cambiado} />
                </div>

                
                

                
              
                <div className="form-group" id='numeroFotografia'>
                  <label>Número de foto:</label>
                  <input type="number" name="numero_foto"  value={formulario.numero_foto || ''} onChange={cambiado} />
                </div>
                
                
                <div className="form-group">
                <label>Número de álbum:</label>
                  <select name="numero_album" id="num_album" value={formulario.numero_album || ''} onChange={cambiado} >
                  <option value="">Número de álbum</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                  </select>
                </div>
                <div className="form-group" id='fechaFoto'>
                  <label>Fecha:</label>
                  <input type="date" name="fecha" className="small-input" placeholder="Año" value={formulario.fecha || ''} onChange={cambiado} />
                  
                </div>

                <div className="form-group">
                  <label>Formato:</label>
                  <input type="text" name="formato" placeholder="Formato" value={formulario.formato || ''} onChange={cambiado} />
                </div>

                <div className="form-group">
                  <label>Cámara:</label>
                  <input type="text" name="camara" placeholder="Cámara" value={formulario.camara || ''} onChange={cambiado} />
                </div>


                <div className='form-group'>
                                <label htmlFor='file0'>Imagen</label>
                                <input type='file' name='file0' id="file" multiple/>
                            </div>
              

                <div className='divisor_form'>
                            <div className="form-group"id="resumen">
                                <label htmlFor="resumen" id='resumenLabel'>Resumen</label>
                                <textarea
                                    type="text"
                                    id="resumenInput"
                                    name="resumen"
                                    placeholder=""
                                    value={formulario.resumen || ''}
                                    onChange={cambiado}
                                />
                            </div>

                            <div className="form-group"id="transcripcion">
                                <label htmlFor="transcripcion" id="transcripcionLabel">Pendientes</label>
                                <textarea
                                    type="text"
                                    id="transcripcionInput"
                                    name="pendientes"
                                    placeholder="Transcripción"
                                    value={formulario.pendientes || ''}
                                    onChange={cambiado}
                                />
                            </div>
                            </div>

                <div className="form-group">
                  <label>País:</label>
                  <select
                    id="pais"
                    name='pais'
                    value={formulario.pais || ''}
                    onChange={cambiado}>

                    <option value="">Seleccionar país</option>
                    {paises.map((pais) => (
                      <option key={pais} name="paises" value={pais}>
                        {pais}
                      </option>
                    ))}
                  </select>
                </div>







                <div className="form-group">
                  <label>Ciudad:</label>
                  <select
                    id="ciudad"
                    name="ciudad"
                    value={formulario.ciudad || ''}
                    onChange={cambiado}
                  >
                    <option value="">Seleccionar ciudad</option>
                    {ciudades.map((ciudad) => (
                      <option key={ciudad} value={ciudad}>
                        {ciudad}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Institución:</label>
                  <select id="institucion" name='institucion' value={formulario.institucion || ""} onChange={cambiado}>
                    <option value="">Seleccionar institución</option>
                    {instituciones.map((institucion, index) => (
                      <option key={index} value={institucion}>
                        {institucion}
                      </option>
                    ))}
                  </select>
                </div>


                <div className="form-group">
                  <label>Ubicación física:</label>
                  <select name="ubicacion_fisica" value={formulario.ubicacion_fisica || ''} onChange={cambiado}>
                    <option value="">Seleccionar ubicación</option>
                    <option value="Biblioteca">Biblioteca</option>
                    <option value="Archivo">Archivo</option>
                    <option value="Museo">Museo</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Colección:</label>
                  <input  type='text' name="coleccion" value={formulario.coleccion || ''} onChange={cambiado}>
                    
                  </input>
                </div>
               

                
               
                <div className="form-group">
                  <label>Hallazgo:</label>
                  <select id='hallazgo' name="hallazgo" value={formulario.hallazgo || ''} onChange={cambiado}>
                    <option value="No">No</option>
                    <option value="Sí">Sí</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Año de adquisición:</label>
                  <select id='adq' name="fecha_adquisicion" value={formulario.fecha_adquisicion || ''} onChange={cambiado} >
                  <option value="">Seleccionar año</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                    <option value="2009">2009</option>
                    <option value="2008">2008</option>
                    <option value="2007">2007</option>
                  </select>
                </div>





                

                <div className="form-group">
                  <label>Persona que registra:</label>
                  <select name="persona_registra" value={formulario.persona_registra || ''} onChange={cambiado}>
                  <option value="">Seleccionar Persona</option>
                    <option value="Mayra Fonseca">Mayra Fonseca</option>
                    <option value="Robin">Robin</option>
                    <option value="Xoely">Xoely</option>
                    <option value="Perla">Perla</option>
                  </select>
                </div>
              
                <div className="form-group" id='tema'>
                  <label>Tema:</label>
                  <input type='text' name="tema" value={formulario.tema || ''} onChange={cambiado}/>
                  
                </div>
              </div>
              <button className="button" onClick={guardar_foto}>Enviar</button>
              <strong id='saved_text'>{saved === 'saved' ? 'Fotografia registrada correctamente' : ''}</strong>
              <strong id="error_text">{saved === 'error' ? 'No se ha registrado la foto ' : ''}</strong>
            </form>
          </div>

        </div>
      </main>
    </div>
  )
}
