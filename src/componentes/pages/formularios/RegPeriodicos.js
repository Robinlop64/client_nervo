import React from 'react'
import { NavLink } from 'react-router-dom';
import { useForm } from '../../../hooks/useForm';
import { Api } from '../../../hooks/Api';
import { useState, useEffect } from 'react';

export const RegPeriodicos = () => {
    const { formulario, enviado, cambiado, resetFormulario } = useForm({})
    const [resultado, setResultado] = useState(false)
    const [fileName, setFileName] = useState('');
    const [paises, setPaises] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [instituciones, setInstituciones] = useState([]);
    const [selectedPais, setSelectedPais] = useState('');
    const [selectedCiudad, setSelectedCiudad] = useState('');
    const [saved, setSaved] = useState('not sended');
    const [statuses, setStatuses] = useState({ peticion1: '', peticion2: '', peticion3: '', peticion4: '' });
    const [loadingProgress, setLoadingProgress] = useState(0);

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
        setLoadingProgress(0);
        setStatuses({
            peticion1: '',
            peticion2: '',
            peticion3: ''
          });
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
        const { datos } = await Api("https://backend-prueba-apel.onrender.com/api/hemerografia/registrar", "POST", nueva_foto);
        setLoadingProgress(25); // Incrementa el progreso
        setStatuses(prev => ({ ...prev, peticion1: datos.status }));

        
        if (datos.status === "successs") {
         //   console.log("status success")
            const fileInput = document.querySelector("#file");
            const formData = new FormData();
            Array.from(fileInput.files).forEach((file, index) => {
                formData.append(`files`, file);
            });
           // console.log("formdata",formData)
            const  subida2  = await Api(`https://backend-prueba-apel.onrender.com/api/hemerografia/registrar-imagen/${datos.publicacionGuardada._id}`, "POST", formData, true);
            setLoadingProgress(50); // Incrementa el progreso
            setStatuses(prev => ({ ...prev, peticion2: subida2.datos.status }));
        

            const  subida  = await Api(`https://backend-google-fnsu.onrender.com/api/hemerografia/registrar-imagen/${datos.publicacionGuardada._id}`, "POST", formData, true);
            setLoadingProgress(75); // Incrementa el progreso
            setStatuses(prev => ({ ...prev, peticion3: subida.datos.status }));
             // Nueva sección para subir los archivos PDF
             const pdfInput = document.querySelector("#pdf");
             const pdfFormData = new FormData();
             Array.from(pdfInput.files).forEach((file) => {
                 pdfFormData.append('pdfs', file);
             });
     
             //const { pdfSubida } = await Api(`https://backend-prueba-apel.onrender.com/api/hemerografia/registrar-pdf/${datos.publicacionGuardada._id}`, "POST", pdfFormData, true);
             const  pdfSubida2  = await Api(`https://backend-google-fnsu.onrender.com/api/hemerografia/registrar-pdf/${datos.publicacionGuardada._id}`, "POST", pdfFormData, true);
             setLoadingProgress(100); // Incrementa el progreso
             setStatuses(prev => ({ ...prev, peticion4: pdfSubida2.datos.status }));
             setResultado(true);
            setSaved("saved");
        } else {
            console.log("status error")
            setSaved("error");
        }
    };
    const handleAutoComplete = async (field, promptId) => {
        const fileInput = document.querySelector("#file");
        if (fileInput.files.length > 0) {
            const formData = new FormData();
            formData.append('file', fileInput.files[0]);

            const { datos } = await Api(`http://localhost:3900/api/hemerografia/gpt/image-text/${promptId}`, "POST", formData, true);
            if (datos && datos.message) {
                cambiado({ target: { name: field, value: datos.message } });
            }
        } else {
            alert("Por favor selecciona una imagen primero.");
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
                                <label htmlFor="nombrePeriodico">Periódico</label>
                                <input
                                    type='text'
                                    id="nombrePeriodicoSelect"
                                    name="nombre_periodico"
                                    value={formulario.nombre_periodico || ''}
                                    onChange={cambiado}
                                />
                                <button type="button" onClick={() => handleAutoComplete('nombre_periodico', 'Dame el nombre de este periódico, solo contesta con el nombre')}>Auto</button>
                            </div>
                            <div className="form-group" id="numeroEdicion">
                                <label htmlFor="numeroEdicion">Número de edición</label>
                                <input
                                    type="number"
                                    id="numeroEdicionInput"
                                    name="numero_edicion"
                                    value={formulario.numero_edicion}
                                    onChange={cambiado}
                                />
                            </div>
                            <div className="form-group" id="numeroEdicion">
                                <label htmlFor="numeroEdicion">Número de carpeta</label>
                                <input
                                    type="number"
                                    id="numeroEdicionInput"
                                    name="numero_carpeta"
                                    value={formulario.numero_carpeta}
                                    onChange={cambiado}
                                />
                            </div>
                        
                            <div className="form-group" id="FechaPublicacion">
                            <label id='fecha_publicacionLabel'>Fecha de publicación</label>
                            <input
                                type="date"
                                name="fecha_publicacion"
                                value={formulario.fecha_publicacion}
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
                            <div className="form-group">
                                <label>Encabezado</label>
                                <input id='encabezado' type="textarea" name="encabezado" placeholder="Encabezado" value={formulario.encabezado|| ''} onChange={cambiado} />
                                <button type="button" onClick={() => handleAutoComplete('encabezado', 'Dame el encabezado de este periodico, solo contesta con el encabezado sin saltos de linea')}>Auto</button>
                            </div>

                            <div className="form-group" id='autor'>
                                <label>Autor:</label>
                                <input type="text" className='autor' name="autor" placeholder="Autor" value={formulario.autor || ''} onChange={cambiado} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="nombreSeudonimos">Seudónimo</label>
                                <select
                                    id="nombreSeudonimos"
                                    name="seudonimos"
                                    value={formulario.seudonimos || ''}
                                    onChange={cambiado}
                                >
                                    <option value="Amado Nervo">Amado Nervo</option>
                                    <option value="Román">Román</option>
                                    <option value="Rip-Rip">Rip-Rip</option>
                                    <option value="Tricio">Tricio</option>
                                    <option value="Benedictus">Benedictus</option>
                                    <option value="Joie">Joie</option>
                                    <option value="Versión española de Amado Nervo">Version española de Amado Nervo</option>
                                    <option value="X.Y.Z">X.Y.Z</option>
                                    <option value="Quirino Ordaz">Quirino Ordaz</option>
                                    <option value="Triplex">Triplex</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Sección</label>
                                <select
                                    id="generoPeriodistico"
                                    name="seccion"
                                    value={formulario.seccion || ''}
                                    onChange={cambiado}
                                >
                                    <option value="">Seleccionar sección</option>
                                    <option value="Fuegos Fatuos">Fuegos Fatuos</option>
                                    <option value="Pimientos dulces">Pimietos dulces</option>
                                    <option value="Página literaria">Página literaria</option>
                                    <option value="Literatura">Literatura</option>
                                    <option value="Actualidades europeas">Actualidades europeas</option>
                                    <option value="Asuntos femeninos">Asuntos femeninos</option>
                                    <option value="Actualidades literarias">Actualidades literarias</option>
                                    <option value="Actualidades madrileñas">Actualidades madrileñas</option>
                                    <option value="La varita de la virtud">La varita de la virtud</option>
                                    <option value="Desde parís">Desde parís</option>
                                    <option value="Desde Madrid">Desde Madrid</option>                      

                                    <option value="Actualidades">Actualidades</option>
                                    <option value="Actualidades españolas">Actualidades españolas</option>
                                    <option value="Plaso ibañes">Plaso ibañes</option>
                                    <option value="El Imparcial">"El Imparcial"</option>
                                    <option value="De Amado Nervo">De Amado Nervo</option>
                                    <option value="La literatura maravillosa">La literatura maravillosa</option>
                                    <option value="Crónicas frívolas">Crónicas frívolas</option>
                                    <option value="Literatura nacional">Literatura nacional</option>
                                    <option value="Sociales">Sociales</option>
                                    <option value="Poesía">Poesía</option>
                                    <option value="Literaria">Literaria</option>


                                    <option value="NA">NA</option>

                                </select>
                            </div>
                            </div>
                            <div className='divisor_form2'>
                           
                            
                            <div className="form-group" id='pagina'>
                                <label htmlFor="pagina">Página (s)</label>
                                <input
                                    type="text"
                                    id="paginaInput"
                                    name="numero_paginas"
                                    placeholder="Página"
                                    value={formulario.numero_paginas }
                                    onChange={cambiado}
                                />
                            </div>
                            <div className="form-group" id='columnas' >
                                <label htmlFor="columnas">Columnas</label>
                                <input
                                    type="text"
                                    id="columnasInput"
                                    name="columnas"
                                    placeholder="Columnas"
                                    value={formulario.columnas || ''}
                                    onChange={cambiado}
                                />
                            </div>
                            <div className="form-group">
                                <label>Género periodístico</label>
                                <select
                                    id="generoPeriodistico"
                                    name="genero_periodistico"
                                    Value={formulario.genero_periodistico || ''}
                                    onChange={cambiado}
                                >
                                    <option value="">Seleccionar género</option>
                                    <option value="notas">Notas</option>
                                    <option value="articulos">Artículos</option>
                                    <option value="cronicas">Crónicas</option>
                                    <option value="frases">Frases</option>
                                    <option value="Poesía">Poesía</option>
                                    <option value="pendiente">Pendiente</option>
                                    <option value="Noticias">Noticias</option>
                                    <option value="Cuento">Cuento</option>
                                </select>
                                <button type="button" onClick={() => handleAutoComplete('genero_periodistico', 'De los siguientes generos dime cual es mas probable que sea el de el periodico: Notas, Artículos, Crónicas,Frases, Poesía,Noticias solo contesta con el género')}>Auto</button>
                            </div>
                            
                            <div className="form-group" id="lugarPublicacion">
                                <label htmlFor="encabezado">Lugar de publicación</label>
                                <input
                                    type="text"
                                    id="lugarPublicacionInput"
                                    name="lugar_publicacion"
                                    placeholder="Lugar de publicación"
                                    value={formulario.lugar_publicacion || ''}
                                    onChange={cambiado}
                                />
                            </div>
                            <div className="form-group" id="periodicidad">
                                <label htmlFor="tipoPublicacion">Periodicidad</label>
                                <select
                                    type="text"
                                    id="periodicidadInput"
                                    name="periodicidad"
                                    placeholder="Tipo de publicación"
                                    value={formulario.periodicidad || ''}
                                    onChange={cambiado}
                                >
                                <option value="">Seleccionar periodicidad</option>
                                <option value="Diaria">Diaria</option>
                                <option value="Semanal">Semanal</option>
                                <option value="Mensual">Mensual</option>
                                </select>
                            </div>
                           
<div className='divisor_form'>
                            <div className='form-group'>
                                <label htmlFor='file0'>Imagen</label>
                                <input type='file' name='file0' id="file" multiple/>
                            </div>
                            <div className='form-group' id='pdf2'>
                                <label htmlFor='pdfs'>Pdf</label>
                                <input type='file' name='pdfs'id='pdf' multiple/>
                            </div>
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
                                <label htmlFor="transcripcion" id="transcripcionLabel">Pendiente</label>
                                <textarea
                                    type="text"
                                    id="transcripcionInput"
                                    name="pendiente"
                                    value={formulario.pendiente || ''}
                                    onChange={cambiado}
                                />
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
                                    <option value="2004">2004</option>
                                    <option value="2003">2003</option>
                                    <option value="2002">2002</option>

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
                                    <option value="">Seleccionar persona que registra</option>
                                    <option value="Mayra Fonseca">Mayra</option>
                                    <option value="Robin">Robin</option>
                                    <option value="Xoely">Xoely</option>
                                    <option value="Perla">Perla</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Tema:</label>
                                <select name="tema" value={formulario.tema || ''} onChange={cambiado}>
                                    <option value="">Seleccionar el tema</option>
                                    <option value="El Nacional">El Nacional</option>
                                    <option value="El Imparcial">El Imparcial</option>
                                    <option value="El Mundo">El Mundo</option>
                                    <option value="El Mundo Ilustrado">El Mundo Ilustrado</option>
                                    <option value="El País">El País</option>
                                    <option value="El Paladín">El Paladín</option>
                                    <option value="El Plata">El Plata</option>
                                    <option value="El Siglo">El Siglo</option>
                                    <option value="El Telégrafo">El Telégrafo</option>
                                    <option value="La Defensa">La Defensa</option>
                                    <option value="La Gaceta de Guadalajara">La Gaceta de Guadalajara</option>
                                    <option value="La Mañana">La Mañana</option>
                                    <option value="La Nación">La Nación</option>
                                    <option value="La Razón">La Razón </option>
                                    <option value="La Prensa">La Prensa</option>
                                    <option value="México Libre">México Libre</option>
                                    <option value="Recortes de prensa">Recortes de prensa</option>
                                </select>
                            </div>
                            
                            </div>
                            </div>
                          
                        <button className="button" onClick={guardar_foto}>Enviar</button>
              <strong id='saved_text'>{saved === 'saved' ? 'Fotografia registrada correctamente' : ''}</strong>
              <strong id="error_text">{saved === 'error' ? 'No se ha registrado la foto ' : ''}</strong>
                    </form>
                    <div className="progress-bar">
  <div className="progress" style={{ width: `${loadingProgress}%` }}></div>
  <p className="progress-text">{loadingProgress}%</p>
</div>
                    <div>
            <strong id='saved_text'>{statuses.peticion1 === 'successs' ? 'Información registrada correctamente' : ''}</strong>
            <strong id='error_text'>{statuses.peticion1 === 'error' ? 'Error al registrar en base de datos' : ''}</strong>

            <strong id='saved_text'>{statuses.peticion2 === 'success' ? 'Foto subida al servidor Node' : ''}</strong>
            <strong id='error_text'>{statuses.peticion2 === 'error' ? 'Error al registrar en el servidor node' : ''}</strong>

            <strong id='saved_text'>{statuses.peticion3 === 'success' ? 'Foto subida correctamente a Drive' : ''}</strong>
            <strong id='error_text'>{statuses.peticion3 === 'error' ? 'Error al subir foto a Drive' : ''}</strong>

            <strong id='saved_text'>{statuses.peticion4 === 'success' ? 'PDFs subida correctamente a Drive' : ''}</strong>
            <strong id='error_text'>{statuses.peticion4 === 'error' ? 'Error al subir pdf a Drive' : ''}</strong>
     
              <p>Estatus Registro de datos: {statuses.peticion1}</p>
              <p>Estatus Registro de foto: {statuses.peticion2}</p>
              <p>Estatus Guardado de foto en drive: {statuses.peticion3}</p>
            </div>
            
        
                </div>
            </main>
        </div>
    )
}
