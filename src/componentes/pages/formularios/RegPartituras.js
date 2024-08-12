import React from 'react'
import { NavLink } from 'react-router-dom';
import { useForm } from '../../../hooks/useForm';
import { Api } from '../../../hooks/Api';
import { useState, useEffect } from 'react';

export const RegPartituras = () => {
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

    useEffect(() => {
        setSaved("")
    }, [formulario])

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
        const { datos } = await Api("https://backend-prueba-apel.onrender.com/api/partituras/registrar", "POST", nueva_foto);
        console.log(nueva_foto)
        if (datos.status === "successs") {
            console.log("status success")
            const fileInput = document.querySelector("#file");
            const formData = new FormData();
            Array.from(fileInput.files).forEach((file, index) => {
                formData.append(`files`, file);
            });
            console.log("formdata",formData)
            const { subida2 } = await Api(`https://backend-prueba-apel.onrender.com/api/partituras/registrar-imagen/${datos.publicacionGuardada._id}`, "POST", formData, true);
            const { subida } = await Api(`https://backend-google-fnsu.onrender.com/api/partituras/registrar-imagen/${datos.publicacionGuardada._id}`, "POST", formData, true);

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

                    <h1>Formulario de registro de bienes</h1>


                    <div className='frame_botones_registro' id="regresar_boton">
                        <NavLink to="/registro">
                            <button className="button">Regresar</button>
                        </NavLink>
                    </div>
                    <form onSubmit={guardar_foto}>
                        <h2>Campos generales</h2>

                        <div className='divisor_form'>
                        
                            <div className="form-group" id="nombrePeriodico">
                                <label htmlFor="nombrePeriodico">Instrumento</label>
                                <select
                                    id="nombrePeriodicoSelect"
                                    name="instrumento"
                                    value={formulario.instrumento || ''}
                                    onChange={cambiado}
                                >
                                    <option value="">Seleccionar tipo de partituras</option>
                                    <option value="Carta">Carta</option>
                                    <option value="Postal">Postal</option>
                                    <option value="Telegrama">Telegrama</option>
                                    <option value="Tarjeta">Tarjeta</option>
                                    
                                </select>
                            </div>

                            <div className="form-group" id='autor'>
                                <label>genero :</label>
                                <input type="text" className='autor' name="genero" placeholder="Autor" value={formulario.genero || ''} onChange={cambiado} />
                            </div>
                            
                            <div className="form-group" id="FechaPublicacion">
                            <label id='fecha_publicacionLabel'>Duración</label>
                            <input
                                type="text"
                                name="duracion"
                                value={formulario.duracion}
                                onChange={cambiado}
                            />
                            </div>
                            <div className="form-group" id='columnas' >
                                <label htmlFor="columnas">Clave musical</label>
                                <input
                                    type="text"
                                    id="columnasInput"
                                    name="clave_musical"
                                    placeholder="Clave musical"
                                    value={formulario.clave_musical || ''}
                                    onChange={cambiado}
                                />
                            </div>
                            <div className="form-group" id="FechaPublicacion">
                            <label id='fecha_publicacionLabel'>Número de páginas</label>
                            <input
                                type="number"
                                name="numero_paginas"
                                value={formulario.numero_paginas}
                                onChange={cambiado}
                            />
                            </div>


                           
                            <div className="form-group" id='columnas' >
                                <label htmlFor="columnas">Editorial</label>
                                <input
                                    type="text"
                                    id="columnasInput"
                                    name="editorial"
                                    placeholder="editorial"
                                    value={formulario.editorial || ''}
                                    onChange={cambiado}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="nombreSeudonimos">Formato</label>
                                <select
                                    id="nombreSeudonimos"
                                    name="formato"
                                    value={formulario.formato || ''}
                                    onChange={cambiado}
                                >
                                    <option value="">Seleccionar medio </option>
                                    <option value="Román">Román</option>
                                    <option value="Rip-Rip">Rip-Rip</option>
                                    <option value="Tricio">Tricio</option>
                                    <option value="Benedictus">Benedictus</option>
                                    <option value="Joie">Joie</option>
                                    <option value="Versión española de Amado Nervo">Version española de Amado Nervo</option>
                                    <option value="X.Y.Z">X.Y.Z</option>
                                </select>
                            </div>

                            
                            <div className="form-group" id="seccion">
                                <label htmlFor="seccion">Descripción</label>
                                <input
                                    type="text"
                                    id="seccionInput"
                                    name="descripcion_contexto"
                                    placeholder="notas relevantes"
                                    value={formulario.descripcion_contexto || ''}
                                    onChange={cambiado}
                                />
                            </div>


                         
                        
                            

                            <div className="form-group" id="numeroEdicion">
                                <label htmlFor="numeroEdicion">Número de registro</label>
                                <input
                                    type="number"
                                    id="numeroEdicionInput"
                                    name="numero_registro"
                                    value={formulario.numero_registro || ''}
                                    onChange={cambiado}
                                />
                            </div>

                            <div className="form-group" id="numeroEdicion">
                                <label htmlFor="numeroEdicion">audio</label>
                                <input
                                    type="text"
                                    id="numeroEdicionInput"
                                    name="audio"
                                    value={formulario.audio || ''}
                                    onChange={cambiado}
                                />
                            </div>
                         
                            <div className="form-group">
                                <label>Título</label>
                                <input id='encabezado' type="textarea" name="titulo" placeholder="Título" value={formulario.titulo|| ''} onChange={cambiado} />
                            </div>

                            
                            
                        </div>
                            <div className='divisor_form2'>
                           
                           
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
                                    placeholder="Resumen"
                                    value={formulario.resumen || ''}
                                    onChange={cambiado}
                                />
                            </div>

                            <div className="form-group"id="transcripcion">
                                <label htmlFor="transcripcion" id="transcripcionLabel">Transcripción</label>
                                <textarea
                                    type="text"
                                    id="transcripcionInput"
                                    name="transcripcion"
                                    placeholder="Transcripción"
                                    value={formulario.transcripcion || ''}
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
                                    <option value="Fondo reservado">Fondo reservado</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Colección:</label>
                                <select name="coleccion" value={formulario.coleccion || ''} onChange={cambiado}>
                                    <option value="">Seleccionar la colección</option>
                                    <option value="Privada">Privada</option>
                                    <option value="Pública">Pública</option>
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
                                    <option value="2006">2006</option>
                                    <option value="2005">2005</option>

                                </select>
                            </div>





                            <div className="form-group">
                                <label>Hallazgo:</label>
                                <select id='hallazgo' name="hallazgo" value={formulario.hallazgo || ''} onChange={cambiado}>
                                    <option value="No">No</option>
                                    <option value="Sí">Sí</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Persona que registra:</label>
                                <select name="persona_registra" value={formulario.persona_registra || ''} onChange={cambiado}>
                                    <option value="Mayra Fonseca">Mayra Fonseca</option>
                                    <option value="Robin">Robin</option>
                                    <option value="Xoely">Xoely</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Tema:</label>
                                <select name="tema" value={formulario.tema || ''} onChange={cambiado}>
                                    <option value="">Seleccionar el tema</option>
                                    <option value="1"> tema 1</option>
                                    <option value="2"> tema 2 </option>
                                    <option value="El Nacional"> El Nacional </option>
                                    <option value="Repatriación de los restos de Amado Nervo">Repatriación de los restos de Amado Nervo</option>
                                </select>
                            </div>                       
                            </div>
                        <button className="button" onClick={guardar_foto}>Enviar</button>
              <strong id='saved_text'>{saved === 'saved' ? 'Fotografia registrada correctamente' : ''}</strong>
              <strong id="error_text">{saved === 'error' ? 'No se ha registrado la foto ' : ''}</strong>
                    </form>
                </div>
            </main>
        </div>
    )
}
