import React from 'react'
import { Formugeneral } from './Formugeneral'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

export const RegLibros = () => {

    const [empleadoslist,setEmpleados] = useState([])


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
                <Formugeneral/>
                
                <h3>Campos específicos Libro</h3>
                <form onSubmit={getinfo}>
                <div id="esp1">
                    <label>ISBN:</label>
                    <input  type="text" placeholder="Número de foto"/>
                    <label>Editorial:</label>
                    <input  type="text" placeholder="Número de foto"/>
                    <label>Imprenta:</label>
                    <input  type="text" placeholder="Número de foto"/>
                    <label>Edición:</label>
                    <input  type="text" placeholder="Número de foto"/>
                    <label>Prólogo:</label>
                    <input  type="text" placeholder="Número de foto"/>
                    <label>Compiladores:</label>
                    <input  type="text" placeholder="Número de foto"/>
                    <label>Número de páginas:</label>
                    <input  type="text" placeholder="Número de foto"/>
                    <label>Lugar de publicación:</label>
                    <input  type="text" placeholder="Número de foto"/>
                    <label>Lugar de edición:</label>
                    <input  type="text" placeholder="Número de foto"/>
                    <label>Fecha de publicación:</label>
                    <input  type="text" placeholder="Número de foto"/>
                    <label>Fecha de reimpresión:</label>
                    <input  type="text" placeholder="Número de foto"/>
                    <label>Tipo de encuadernación:</label>             
                    <select>
                       <option value="Seleccionar el tipo de fotografía">Seleccionar el tipo de encuadernación</option>
                       <option value="foto">Rústica</option>
                       <option value="foto">Dura</option>
                   </select>

                    <label>Volumen:</label>
                    <input  type="text" placeholder="Número de foto"/>
                    <label>Tomo:</label>
                    <input  type="text" placeholder="Número de foto"/>
                    <label>Género literario:</label>             
                    <select>
                       <option value="Seleccionar el tipo de fotografía">Seleccionar el tipo de Género literario</option>
                       <option value="foto">Rústica</option>
                       <option value="foto">Dura</option>
                   </select>
                   <label>Resumen</label>
                   <input  type="text" placeholder="Número de foto"/>
                   <label>Número de ejemplar</label>
                   <input  type="text" placeholder="Número de foto"/>
                   <label></label>
                   <input  type="text" placeholder="Número de foto"/>
                </div>
                <input type='submit' value="Enviar" />
                </form>

            </div>
        </main>
        
    </div>
  )
}
