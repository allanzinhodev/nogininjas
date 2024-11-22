import React, { useEffect, useState } from 'react';
import { Container, Card, ListGroup, Row, Col, Spinner, Alert } from 'react-bootstrap';

const FighterFights= ({ fighterId }) => {
    const [fighter, setFighter] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
      // A URL do endpoint, incluindo o id do lutador
      const url = `/api/getFighterFights?id=${fighterId}`;

      const fetchFighter = async () => {
        try {
          const response = await fetch(url);

          // Se a resposta for bem-sucedida
          if (response.ok) {
            const data = await response.json();
            setFighter(data);  // Define os dados do lutador no estado
          } else {
            // Caso não tenha sucesso
            setError('Lutador não encontrado');
          }
        } catch (err) {
          // Em caso de erro na requisição
          setError('Erro ao buscar o lutador');
          console.error('Fetch Error:', err);
        }
      };

      // Chama a função para buscar o lutador
      fetchFighter();
    }, [fighterId]);  // Atualiza sempre que o fighterId mudar

    // Renderiza o componente
    if (error) {
      return <div>{error}</div>;
    }

    if (!fighter) {
      return <div>Carregando...</div>;
    }
    
    return (
        <Container fluid className="mt-4">
            <h2>Lutas do Lutador</h2>
            <Card>
                <Card.Body>
                    <Row className="font-weight-bold text-center mb-2">
                        <Col><strong>Result</strong></Col>
                        <Col><strong>Opponent</strong></Col>
                        <Col><strong>Event</strong></Col>
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