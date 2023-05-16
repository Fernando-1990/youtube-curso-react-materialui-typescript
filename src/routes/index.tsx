import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useDrawerContext } from '../shared/contexts';
import {
  Dashboard,
  DetalheDePessoas,
  ListagemDePessoas,
  DetalheDeCidades,
  ListagemDeCidades,
} from '../pages';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/pagina-inicial',
        label: 'Página inicial',
      },
      {
        icon: 'location_city',
        path: '/cities',
        label: 'Cidades',
      },
      {
        icon: 'people',
        path: '/person',
        label: 'Pessoas',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="/person" element={<ListagemDePessoas />} />
      <Route path="/person/detalhe/:id" element={<DetalheDePessoas />} />

      <Route path="/cities" element={<ListagemDeCidades />} />
      <Route path="/cities/detalhe/:id" element={<DetalheDeCidades />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
