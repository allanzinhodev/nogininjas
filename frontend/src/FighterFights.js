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
                const response = await fetch(`${baseURL}/fighters/${fighterId}/fights`);
                if (!response.ok) {
                    throw new Error('Nenhuma luta encontrada para este lutador');
                }
                const data = await response.json();
                
                // Adiciona o nome do oponente para cada luta
                const fightsWithOpponentName = await Promise.all(data.map(async (fight) => {
                    const opponentId = fight.fighter_one === fighterId ? fight.fighter_two : fight.fighter_one;
                    
                    // Fazer a requisição para obter os dados do oponente
                    const opponentResponse = await fetch(`${baseURL}/fighters/${opponentId}`);
                    const opponentData = await opponentResponse.json();
                    
                    return { ...fight, opponentId, opponentName: opponentData.name };
                }));

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
