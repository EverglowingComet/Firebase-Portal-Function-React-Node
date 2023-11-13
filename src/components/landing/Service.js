import React from 'react';
import defaultIcon1 from 'assets/img/icons/retail-hero.jpg';
import { t } from "i18next";
import { Row, Col, Button } from 'reactstrap';

export function Service(props) {
    const {landingData} = props;
    
    const defaultService =
    {
        id: '1',
        title: t('service_title_1'),
        text: t('service_text_1'),
        icon: defaultIcon1,
        link: 'https://www.sparkdiagnostics.com/all-products'
    };

    const service = landingData && landingData.service ? landingData.service : defaultService;

    return (
        <div className='container'>
            <Row className='landing-content-layout'>
                <Col lg={6} sm={4} xs={12}>
                    <img className='landing-service-icon' alt="icon" src={service.icon} />
                </Col>
                <Col lg={6} sm={8} xs={12} className='landing-service-wrapper'>
                    <div className='landing-service-item'>
                        <h3 className='landing-service-title'>{service.title}</h3>
                        <h3 className='landing-service-text'>{service.text}</h3>
                        <Button className="btn-landing-link" onClick={e=> {
                            window.location = service.link;
                        }}>{t('explore_partnership')}</Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
}