
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert, Card, CardContent } from '@mui/material';

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
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Visualización de Optimización Lineal
      </Typography>
      {loading && <Box display="flex" justifyContent="center"><CircularProgress /></Box>}
      {error && <Alert severity="error">{error}</Alert>}
      {data && (
        <>
          <Box my={3}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" gutterBottom>Resultados Simplex</Typography>
                <Typography variant="body1" color="primary">
                  <b>Maximización:</b> Z = ${data.max.Z.toLocaleString()} en (x, y) = ({data.max.x.toFixed(2)}, {data.max.y.toFixed(2)})
                </Typography>
                <Typography variant="body1" color="secondary">
                  <b>Minimización:</b> Z = ${data.min.Z.toLocaleString()} en (x, y) = ({data.min.x.toFixed(2)}, {data.min.y.toFixed(2)})
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box my={3}>
            <Typography variant="h6" gutterBottom>Vértices Factibles</Typography>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><b>x</b></TableCell>
                    <TableCell><b>y</b></TableCell>
                    <TableCell><b>Z</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.vertices.map((v, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{v.x.toFixed(2)}</TableCell>
                      <TableCell>{v.y.toFixed(2)}</TableCell>
                      <TableCell>{v.Z.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box my={3} textAlign="center">
            <Typography variant="h6" gutterBottom>Gráfico de la Región Factible</Typography>
            <img src={`${API_URL}/grafico`} alt="Gráfico de optimización" style={{ maxWidth: '100%', borderRadius: 8, boxShadow: '0 2px 8px #0002' }} />
          </Box>
        </>
      )}
    </Container>
  );
}

export default App;
