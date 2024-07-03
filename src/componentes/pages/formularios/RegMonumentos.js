import React from 'react'
import { Formugeneral } from './Formugeneral'

export const RegMonumentos = () => {
  return (
    <div>
        <main id='main2'>
            <div id="container2">
            <Formugeneral/>


            <h3>Campos específicos monumentos</h3>
                <div id="esp1">
                    <label for="tipoMonumento">Tipo de monumento</label>
                    <input type="text" id="tipoMonumento" name="tipoMonumento" placeholder="Tipo de monumento"/>
            
                    <label for="ubicacion">Ubicación</label>
                    <input type="text" id="ubicacion" name="ubicacion" placeholder="Ubicación"/>
            
                    <label>Fecha de inauguración</label>
                    <label for="diaInauguracion">Día</label>
                    <input type="text" id="diaInauguracion" name="diaInauguracion" placeholder="Día"/>
                    <label for="mesInauguracion">Mes</label>
                    <input type="text" id="mesInauguracion" name="mesInauguracion" placeholder="Mes"/>
                    <label for="anioInauguracion">Año</label>
                    <input type="text" id="anioInauguracion" name="anioInauguracion" placeholder="Año"/>
            
                    <label for="entidadResponsable">Entidad responsable</label>
                    <input type="text" id="entidadResponsable" name="entidadResponsable" placeholder="Entidad responsable"/>
            
                    <label for="descripcionFisica">Descripción física (material, medidas)</label>
                    <input type="text" id="descripcionFisica" name="descripcionFisica" placeholder="Descripción física"/>
            
                    <label for="placa">Placa</label>
                    <input type="text" id="placa" name="placa" placeholder="Placa"/>
            
                    <label for="eventoInauguracion">Evento de inauguración</label>
                    <input type="text" id="eventoInauguracion" name="eventoInauguracion" placeholder="Evento de inauguración"/>
            

                </div>
            </div>
        </main>
    </div>
  )
}
