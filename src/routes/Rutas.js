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
import { Fotografias } from '../componentes/pages/acervo/Fotografias';
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
            <Route path="login" element={<Inicio />} />
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
            <Route path='logout' element={<Logout/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
