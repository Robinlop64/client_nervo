import React from 'react'
import { Formugeneral } from './Formugeneral'

export const RegObjetos = () => {
  return (
    <div>
        <main id='main2'>
            <div id="container2">
            <Formugeneral/>

            <h3>Campos específicos Objetos personales</h3>
                <div id="esp1">
                    <label for="tipoObjeto">Tipo de objeto</label>
                    <input type="text" id="tipoObjeto" name="tipoObjeto" placeholder="Tipo de objeto"/>
            
                    <label for="descripcionFisica">Descripción física</label>
                    <input type="text" id="descripcionFisica" name="descripcionFisica" placeholder="Descripción física"/>
            
                    <label>Fecha de uso</label>
                    <label for="diaUso">Día</label>
                    <input type="text" id="diaUso" name="diaUso" placeholder="Día"/>
                    <label for="mesUso">Mes</label>
                    <input type="text" id="mesUso" name="mesUso" placeholder="Mes"/>
                    <label for="anioUso">Año</label>
                    <input type="text" id="anioUso" name="anioUso" placeholder="Año"/>
            
                    <label for="contextoUso">Contexto de uso</label>
                    <input type="text" id="contextoUso" name="contextoUso" placeholder="Contexto de uso"/>
            
                    <label for="procedencia">Procedencia</label>
                    <input type="text" id="procedencia" name="procedencia" placeholder="Procedencia"/>
            
            
                    <label for="notas">Notas</label>
                    <input type="text" id="notas" name="notas" placeholder="Notas"/>
                </div>
                
            </div>
        </main>
    </div>
  )
}
