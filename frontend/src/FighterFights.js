import React, { useEffect, useState } from "react";
import { Card, Table, Alert } from "react-bootstrap";
import axios from "axios";

const FighterFights = ({ fighterId }) => {
  const [fights, setFights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFights = async () => {
      try {
        // Chama o endpoint para obter as lutas do lutador
        const response = await axios.get(`/getFighterFights?id=${fighterId}`);
        setFights(response.data); // Salva as lutas no estado
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar as lutas:", err);
        setError("Não foi possível carregar as lutas.");
        setLoading(false);
      }
    };

    fetchFights();
  }, [fighterId]);

  return (
    <Card>
      <Card.Header as="h5" className="text-center">Lutas</Card.Header>
      <Card.Body>
        {loading ? (
          <Alert variant="info">Carregando lutas...</Alert>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : fights.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID da Luta</th>
                <th>Lutador 1</th>
                <th>Lutador 2</th>
                <th>Resultado</th>
                <th>Evento</th>
              </tr>
            </thead>
            <tbody>
              {fights.map((fight) => (
                <tr key={fight.id}>
                  <td>{fight.id}</td>
                  <td>{fight.fighter_one}</td>
                  <td>{fight.fighter_two}</td>
                  <td>{fight.result}</td>
                  <td>{fight.event}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Alert variant="warning">Nenhuma luta encontrada para este lutador.</Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default FighterFights;
