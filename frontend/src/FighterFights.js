import React, { useEffect, useState } from 'react';
import { Container, Card, ListGroup, Row, Col, Spinner, Alert } from 'react-bootstrap';

function FighterFights({ fighterId }) {
  const [fights, setFights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    async function fetchFights() {
      try {
        const response = await fetch(`${baseURL}/getFighterFights?id=${fighterId}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar as lutas');
        }
        const data = await response.json();

        // Buscar os dados dos oponentes em uma única requisição
        const opponentIds = data.map(fight =>
          fight.fighter_one === fighterId ? fight.fighter_two : fight.fighter_one
        );
        const uniqueOpponentIds = [...new Set(opponentIds)]; // Remove IDs duplicados

        // Buscar dados dos oponentes em lote
        const opponentsResponse = await fetch(`${baseURL}/getFighters?ids=${uniqueOpponentIds.join(',')}`);
        if (!opponentsResponse.ok) {
          throw new Error('Erro ao buscar dados dos oponentes');
        }
        const opponentsData = await opponentsResponse.json();

        // Mapear os dados dos oponentes para fácil acesso
        const opponentsMap = opponentsData.reduce((map, opponent) => {
          map[opponent.id] = opponent.name;
          return map;
        }, {});

        // Adicionar o nome do oponente para cada luta
        const fightsWithOpponentName = data.map(fight => {
          const opponentId = fight.fighter_one === fighterId ? fight.fighter_two : fight.fighter_one;
          return { ...fight, opponentId, opponentName: opponentsMap[opponentId] };
        });

        setFights(fightsWithOpponentName);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFights();
  }, [fighterId, baseURL]);

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">Erro: {error}</Alert>;

  return (
    <Container fluid className="mt-4">
      <h2>Lutas do Lutador</h2>
      <Card>
        <Card.Body>
          <Row className="font-weight-bold text-center mb-2">
            <Col><strong>Resultado</strong></Col>
            <Col><strong>Oponente</strong></Col>
            <Col><strong>Evento</strong></Col>
          </Row>
          <ListGroup>
            {fights.length > 0 ? (
              fights.map((fight, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col className="text-center">
                      <p style={{ color: fight.result === fighterId ? 'green' : 'red' }}>
                        <strong>{fight.result === fighterId ? 'WIN' : 'LOSS'}</strong>
                      </p>
                      <p>{fight.submission}</p>
                      <p>{fight.time}</p>
                    </Col>
                    <Col className="text-center">
                      <img
                        src={`../figther/thumb/${fight.opponentId}.png`}
                        alt={`Thumbnail do oponente ${fight.opponentId}`}
                        style={{ height: '100px', borderRadius: '50%' }}
                      />
                      <p>{fight.opponentName}</p>
                    </Col>
                    <Col className="text-center">
                      <p>{fight.event}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))
            ) : (
              <Alert variant="warning">Nenhuma luta encontrada para este lutador.</Alert>
            )}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default FighterFights;
