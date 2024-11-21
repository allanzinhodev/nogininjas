import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Spinner, Alert, Image } from 'react-bootstrap';

const FighterDetail = ({ fighterId }) => {
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