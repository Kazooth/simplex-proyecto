

import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';
import { FaChartLine, FaTable, FaCheckCircle } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/optimizacion`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('No se pudo obtener datos de la API');
        setLoading(false);
      });
  }, []);

  return (
    <div>
  <header className="neumorph-header fade-in"><FaChartLine className="icon" />Visualización de Optimización Lineal</header>
  {loading && <div style={{marginTop: '2em'}}><span className="neumorph-card fade-in"><FaCheckCircle className="icon" />Cargando...</span></div>}
  {error && <div style={{marginTop: '2em'}}><span className="neumorph-card fade-in" style={{color: '#d32f2f'}}><FaCheckCircle className="icon" />{error}</span></div>}
      {data && (
        <>
          <div className="neumorph-card fade-in">
            <h2 style={{marginBottom: '1em'}}><FaCheckCircle className="icon" />Resultados Simplex</h2>
            <div style={{textAlign: 'left'}}>
              <div style={{color: '#1976d2', fontWeight: 'bold', fontSize: '1.1em'}}><FaCheckCircle className="icon" />Maximización: <span style={{color: '#333'}}>Z = ${data.max.Z.toLocaleString()} en (x, y) = ({data.max.x.toFixed(2)}, {data.max.y.toFixed(2)})</span></div>
              <div style={{color: '#d32f2f', fontWeight: 'bold', fontSize: '1.1em'}}><FaCheckCircle className="icon" />Minimización: <span style={{color: '#333'}}>Z = ${data.min.Z.toLocaleString()} en (x, y) = ({data.min.x.toFixed(2)}, {data.min.y.toFixed(2)})</span></div>
            </div>
          </div>
          <div className="neumorph-card fade-in">
            <h2 style={{marginBottom: '1em'}}><FaTable className="icon" />Vértices Factibles</h2>
            <div style={{overflowX: 'auto'}}>
              <table className="neumorph-table" style={{width: '100%', margin: '0 auto'}}>
                <thead>
                  <tr>
                    <th>x</th>
                    <th>y</th>
                    <th>Z</th>
                  </tr>
                </thead>
                <tbody>
                  {data.vertices.map((v, idx) => (
                    <tr key={idx}>
                      <td>{v.x.toFixed(2)}</td>
                      <td>{v.y.toFixed(2)}</td>
                      <td>{v.Z.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="neumorph-card fade-in" style={{textAlign: 'center'}}>
            <h2 style={{marginBottom: '1em'}}><FaChartLine className="icon" />Gráfico de la Región Factible</h2>
            <img src={`${API_URL}/grafico`} alt="Gráfico de optimización" style={{ maxWidth: '100%', borderRadius: 16, boxShadow: '4px 4px 12px #b8bac0, -4px -4px 12px #ffffff', animation: 'fadeIn 1.2s' }} />
          </div>
        </>
      )}
      <footer className="neumorph-footer">
        &copy; {new Date().getFullYear()} Proyecto Simplex — Desarrollado por Kazooth
      </footer>
    </div>
  );
}

export default App;
