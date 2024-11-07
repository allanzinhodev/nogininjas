import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Spinner, Alert, Image } from 'react-bootstrap';

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
        <Container>
            {fighter ? (
                <>
                    <Row className='fighterCard'>
                        <Col md={4}>
                            <Image src={`../figther/thumb/${fighter.id}.png`} fluid />
                        </Col>
                        <Col className='my-4 infos' md={8}>
                            <h1 className='text-uppercase pt-4'>{fighter.name}</h1><br />
                            <section className='titulo'>
                                <h5 className='titulo'>Altura</h5> {fighter.height}<br />
                            </section>
                            <strong>País:</strong> {fighter.country}<br />
                            <strong>Idade:</strong> {fighter.age}<br />
                            <strong>Equipe:</strong> {fighter.team}<br />
                        </Col>
                    </Row>
                    <Container className='about my-4'>
                        <h2 className='text-uppercase'>Sobre {fighter.name}</h2>
                        {fighter.about}
                    </Container>
                </>
            ) : (
                <Alert variant="warning">Lutador não encontrado.</Alert>
            )}
        </Container>
    );
}

export default FighterDetail;
