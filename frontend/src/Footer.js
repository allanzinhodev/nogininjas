import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'; // Ícones de redes sociais


function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer style={{ backgroundColor: '#343a40', color: 'white', padding: '20px 0' }}>
            <Container>
                <Row className="text-center">
                    {/* Botão para voltar ao topo */}
                    <Col xs={12} className="mb-3">
                        <Button variant="light" onClick={scrollToTop}>
                            ↑ Voltar ao Início
                        </Button>
                    </Col>

                    {/* Seção de redes sociais */}
                    <Col xs={12} className="mb-3">
                        <FaFacebook size={30} style={{ margin: '0 10px' }} />
                        <FaInstagram size={30} style={{ margin: '0 10px' }} />
                        <FaTwitter size={30} style={{ margin: '0 10px' }} />
                    </Col>

                    {/* Logo e mensagem de direitos autorais */}
                    <Col xs={12}>
                        <img src="logo.png" alt="NO-GI Ninjas Logo" style={{ height: '50px', marginBottom: '10px' }} />
                        <p>NO-GI Ninjas &copy; Todos os direitos reservados</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
