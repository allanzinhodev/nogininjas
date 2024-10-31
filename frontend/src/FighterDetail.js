import React, { useEffect, useState } from 'react';
import { Container, Card, Spinner, Alert } from 'react-bootstrap';

function FighterDetail({ fighterId }) {
    const [fighter, setFighter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchFighter() {
            try {
                const response = await fetch(`http://localhost:3000/fighters/${fighterId}`);
                if (!response.ok) {
                    throw new Error('Lutador não encontrado');
                }
                const data = await response.json();
                console.log(data); // Verifique a estrutura dos dados
                setFighter(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchFighter();
    }, [fighterId]);

    if (loading) return <Spinner animation="border" variant="primary" />;
    if (error) return <Alert variant="danger">Erro: {error}</Alert>;

    // Adicione este console.log para verificar o que está armazenado em fighter
    console.log(fighter);

    return (
        <Container fluid className='fighterCard'>
            <h2>Detalhes do Lutador</h2>
            {fighter ? (
                <Card className='transparent-card'>
                    <Card.Body>
                        <Card.Title>{fighter.name}</Card.Title>
                        <Card.Text>
                            <strong>Altura:</strong> {fighter.height}<br />
                            <strong>País:</strong> {fighter.country}<br />
                            <strong>Idade:</strong> {fighter.age}<br />
                            <strong>Equipe:</strong> {fighter.team}<br />
                            <strong>Sobre:</strong> {fighter.about}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ) : (
                <Alert variant="warning">Lutador não encontrado.</Alert>
            )}
        </Container>
    );
}

export default FighterDetail;
