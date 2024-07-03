import React from 'react'
import { Formugeneral } from './Formugeneral'

export const RegDocumentacion = () => {
  return (
    <div>
        <main id='main2'>
            <div id="container2">
            <Formugeneral/>

            
            <h3>Campos específicos Documentación</h3>
            <div id="esp1">
                <label for="tipoDocumento">Tipo de documento</label>
                <input type="text" id="tipoDocumento" name="tipoDocumento" placeholder="Tipo de documento"/>

                <label>Fecha de emisión</label>
                <label for="diaEmision">Día</label>
                <input type="text" id="diaEmision" name="diaEmision" placeholder="Día"/>
                <label for="mesEmision">Mes</label>
                <input type="text" id="mesEmision" name="mesEmision" placeholder="Mes"/>
                <label for="anioEmision">Año</label>
                <input type="text" id="anioEmision" name="anioEmision" placeholder="Año"/>

                <label for="emisor">Emisor</label>
                <input type="text" id="emisor" name="emisor" placeholder="Emisor"/>

                <label for="lugarEmision">Lugar de emisión</label>
                <input type="text" id="lugarEmision" name="lugarEmision" placeholder="Lugar de emisión"/>

                <label for="proposito">Propósito</label>
                <input type="text" id="proposito" name="proposito" placeholder="Propósito"/>

                <label for="vigencia">Vigencia</label>
                <input type="text" id="vigencia" name="vigencia" placeholder="Vigencia"/>

                <label for="notasRelevantes">Notas relevantes</label>
                <input type="text" id="notasRelevantes" name="notasRelevantes" placeholder="Notas relevantes"/>

                <label for="enlaceDocumento">Enlace al documento o transcripción</label>
                <input type="text" id="enlaceDocumento" name="enlaceDocumento"
                    placeholder="Enlace al documento o transcripción"/>

            </div>

            </div>
        </main>
    </div>
  )
}
