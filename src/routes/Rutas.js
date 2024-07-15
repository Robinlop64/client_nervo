import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '../componentes/layout/Header';
import { Nav } from '../componentes/layout/Nav';
import { Inicio } from '../componentes/pages/Inicio';
import { Registro } from '../componentes/pages/Registro';
import { Menuiconografia } from '../componentes/pages/Menuiconografia';
import { RegFotografia } from '../componentes/pages/formularios/RegFotografia';
import { RegIconografia } from '../componentes/pages/formularios/RegIconografia';
import { RegLibros } from '../componentes/pages/formularios/RegLibros';
import { RegPeriodicos } from '../componentes/pages/formularios/RegPeriodicos';
import { RegCorrespondencia } from '../componentes/pages/formularios/RegCorrespondencia';
import { RegDocumentacion } from '../componentes/pages/formularios/RegDocumentacion';
import { RegObjetos } from '../componentes/pages/formularios/RegObjetos';
import { RegPartituras } from '../componentes/pages/formularios/RegPartituras';
import { RegMonumentos } from '../componentes/pages/formularios/RegMonumentos';
import { RegAudiovisuales } from '../componentes/pages/formularios/RegAudiovisuales';
import { Acervo } from '../componentes/pages/Acervo';

import { Croonologia } from '../componentes/pages/Croonologia';
import { Instituciones } from '../componentes/pages/Instituciones';
import { Formugeneral } from '../componentes/pages/formularios/Formugeneral';
import { FotoDetalle } from '../componentes/pages/acervo/FotoDetalle';
import { Fotografias2 } from '../componentes/pages/acervo/Fotografias2';
import { Cortejo } from '../componentes/pages/acervo/temas/Cortejo';
import { AlbumFotos } from '../componentes/pages/acervo/temas/AlbumFotos';
import { PublicLayout2 } from '../componentes/layout/publico/PublicLayout2';
import { Login } from '../componentes/layout/publico/Login';
import { Register } from '../componentes/layout/publico/Register';
import { PrivateLayout } from '../componentes/layout/privado/PrivateLayout';
import { AuthProvider } from '../context/AuthProvider';
import { Logout } from '../componentes/layout/publico/Logout';
import { EditarFotografia } from '../componentes/pages/formularios/Editores/EditarFotografia';
import { Hemerografia } from '../componentes/pages/acervo/Hemerografia';
import { HemerografiaTema } from '../componentes/pages/acervo/temas/HemerografiaTema';
import { HemerografiaDetalle } from '../componentes/pages/acervo/detalles/HemerografiaDetalle';
import { EditarHemerografia } from '../componentes/pages/formularios/Editores/EditarHemerografia';
import { Iconografia } from '../componentes/pages/acervo/Iconografia';
import { IconografiaTema } from '../componentes/pages/acervo/temas/IconografiaTema';
import { IconografiaDetalle } from '../componentes/pages/acervo/detalles/IconografiaDetalle';
import { EditarIconografia } from '../componentes/pages/formularios/Editores/EditarIconografia';
import { Libros } from '../componentes/pages/acervo/Libros';
import { LibrosTema } from '../componentes/pages/acervo/temas/LibrosTema';
import { LibrosDetalle } from '../componentes/pages/acervo/detalles/LibrosDetalle';
import { EditarLibros } from '../componentes/pages/formularios/Editores/EditarLibros';
import { Correspondencia } from '../componentes/pages/acervo/Correspondencia';
import { CorrespondenciaTema } from '../componentes/pages/acervo/temas/CorrespondenciaTema';
import { CorrespondenciaDetalle } from '../componentes/pages/acervo/detalles/CorrespondenciaDetalle';
import { EditarCorrespondencia } from '../componentes/pages/formularios/Editores/EditarCorrespondencia';
import { Documentacion } from '../componentes/pages/acervo/Documentacion';
import { DocumentacionDetalle } from '../componentes/pages/acervo/detalles/DocumentacionDetalles';
import { DocumentacionTema } from '../componentes/pages/acervo/temas/DocumentacionTemas';
import { Partituras } from '../componentes/pages/acervo/Partituras';
import { Objetos } from '../componentes/pages/acervo/Objetos';
import { Monumentos } from '../componentes/pages/acervo/Monumentos';
import { PartiturasTema } from '../componentes/pages/acervo/temas/PartiturasTema';
import { ObjetosTema } from '../componentes/pages/acervo/temas/ObjetosTemas';
import { MonumentosTema } from '../componentes/pages/acervo/temas/MonumentosTemas';
import { MonumentosDetalle } from '../componentes/pages/acervo/detalles/MonumentosDetalle';
import { ObjetosDetalle } from '../componentes/pages/acervo/detalles/ObjetosDetalle';
import { PartiturasDetalle } from '../componentes/pages/acervo/detalles/PartiturasDetalle';

export const Rutas = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicLayout2 />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="registrar" element={<Register />} />
            <Route path="inicio" element={<Inicio />} />
            <Route path="registro" element={<Registro />} />
            <Route path="acervo" element={<Acervo />} />
            <Route path="croonologia" element={<Croonologia />} />
            <Route path="instituciones" element={<Instituciones />} />
            <Route path="registro/menu-iconografia" element={<Menuiconografia />} />
            <Route path="registro/fotografia" element={<RegFotografia />} />
            <Route path="registro/iconografia" element={<RegIconografia />} />
            <Route path="registro/libros" element={<RegLibros />} />
            <Route path="registro/periodicos" element={<RegPeriodicos />} />
            <Route path="registro/correspondencia" element={<RegCorrespondencia />} />
            <Route path="registro/documentacion" element={<RegDocumentacion />} />
            <Route path="registro/objetos" element={<RegObjetos />} />
            <Route path="registro/partituras" element={<RegPartituras />} />
            <Route path="registro/monumentos" element={<RegMonumentos />} />
            <Route path="registro/audiovisuales" element={<RegAudiovisuales />} />
            <Route path="fotografias" element={<Fotografias2 />} />
            <Route path="fotografias/:id" element={<FotoDetalle />} />
            <Route path="fotografias2" element={<Fotografias2 />} />
            <Route path="tema/Cortejo fúnebre" element={<Cortejo />} />
            <Route path="album/:id" element={<AlbumFotos />} />
          </Route>

          <Route path="/admin" element={<PrivateLayout />}>
            <Route index element={<Inicio />} />
            <Route path="/admin/login" element={<Inicio />} />
            <Route path="/admin/registrar" element={<Register />} />
            <Route path="/admin/inicio" element={<Inicio />} />
            <Route path="/admin/registro" element={<Registro />} />
            <Route path="/admin/acervo" element={<Acervo />} />
            <Route path="/admin/croonologia" element={<Croonologia />} /> 
            <Route path="/admin/instituciones" element={<Instituciones />} />
            <Route path="/admin/registro/menu-iconografia" element={<Menuiconografia />} />
            <Route path="/admin/registro/fotografia" element={<RegFotografia />} />
            <Route path="/admin/editar/fotografia/:id" element={<EditarFotografia />} />
            <Route path="/admin/registro/iconografia" element={<RegIconografia />} />
            <Route path="/admin/registro/libros" element={<RegLibros />} />
            <Route path="/admin/registro/periodicos" element={<RegPeriodicos />} />
            <Route path="/admin/registro/correspondencia" element={<RegCorrespondencia />} />
            <Route path="/admin/registro/documentacion" element={<RegDocumentacion />} />
            <Route path="/admin/registro/objetos" element={<RegObjetos />} />
            <Route path="/admin/registro/partituras" element={<RegPartituras />} />
            <Route path="/admin/registro/monumentos" element={<RegMonumentos />} />
            <Route path="/admin/registro/audiovisuales" element={<RegAudiovisuales />} />


            <Route path="/admin/fotografias" element={<Fotografias2 />} />
            <Route path="/admin/fotografias/:id" element={<FotoDetalle />} />
            <Route path="/admin/fotografias2" element={<Fotografias2 />} />
            <Route path="/admin/tema/Repatriación de los restos de Amado Nervo" element={<Cortejo />} />
            <Route path="/admin/album/:id" element={<AlbumFotos />} />

            <Route path="/admin/hemerografia" element={<Hemerografia />} />
            <Route path="/admin/hemerografia/tema/:id" element={<HemerografiaTema />} />
            <Route path="/admin/hemerografia/:id" element={<HemerografiaDetalle />} />
            <Route path="/admin/editar/hemerografia/:id" element={<EditarHemerografia />} />

            <Route path="/admin/iconografia" element={<Iconografia />} />
            <Route path="/admin/iconografia/tema/:id" element={<IconografiaTema />} />
            <Route path="/admin/iconografia/:id" element={<IconografiaDetalle />} />
            <Route path="/admin/editar/iconografia/:id" element={<EditarIconografia />} />

            <Route path="/admin/libros" element={<Libros />} />
            <Route path="/admin/libros/tema/:id" element={<LibrosTema />} />
            <Route path="/admin/libros/:id" element={<LibrosDetalle />} />
            <Route path="/admin/editar/libros/:id" element={<EditarLibros />} />


            <Route path="/admin/correspondencia" element={<Correspondencia/>} />
            <Route path="/admin/correspondencia/tema/:id" element={<CorrespondenciaTema />} />
            <Route path="/admin/correspondencia/:id" element={<CorrespondenciaDetalle />} />
            <Route path="/admin/editar/correspondencia/:id" element={<EditarCorrespondencia />} />


            <Route path="/admin/documentacion" element={<Documentacion/>} />
            <Route path="/admin/documentacion/tema/:id" element={<DocumentacionTema />} />
            <Route path="/admin/documentacion/:id" element={<DocumentacionDetalle />} />


            <Route path="/admin/partituras" element={<Partituras/>} />
            <Route path="/admin/partituras/tema/:id" element={<PartiturasTema />} />
            <Route path="/admin/partituras/:id" element={<PartiturasDetalle />} />
            
            <Route path="/admin/objetos" element={<Objetos/>} />
            <Route path="/admin/objetos/tema/:id" element={<ObjetosTema />} />
            <Route path="/admin/objetos/:id" element={<ObjetosDetalle />} />
            
            <Route path="/admin/monumentos" element={<Monumentos/>} />
            <Route path="/admin/monumentos/tema/:id" element={<MonumentosTema />} />
            <Route path="/admin/monumentos/:id" element={<MonumentosDetalle />} />


            <Route path='/admin/logout' element={<Logout/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
