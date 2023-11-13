import React from 'react';
import defaultIcon1 from 'assets/img/icons/illustration_apt-move.svg';
import defaultIcon2 from 'assets/img/icons/illustration_store-delivery.svg';
import defaultIcon3 from 'assets/img/icons/illustration_truck-muscle.svg';
import { t } from "i18next";
import { Row, Col, Button } from 'reactstrap';

export function FeaturedItems(props) {

    const defaultFeatures = [
        {
            id: '1',
            title: t('feature_title_1'),
            text: t('feature_text_1'),
            icon: defaultIcon1,
            link: 'https://www.sparkdiagnostics.com/all-products'
        },
        {
            id: '2',
            title: t('feature_title_2'),
            text: t('feature_text_2'),
            icon: defaultIcon2,
            link: 'https://www.sparkdiagnostics.com'
        },
        {
            id: '3',
            title: t('feature_title_3'),
            text: t('feature_text_3'),
            icon: defaultIcon3,
            link: 'https://www.sparkdiagnostics.com'
        },
    ];
    
    function renderFeatureItem(item) {
        return (
            <div className='landing-feature-item'>
                <div style={{width: '100%', backgroundColor: '#fa616a', height: 8}} />
                <img className='landing-feature-icon' alt="icon" src={item.icon} />
                <h3 className='landing-feature-title landing-feature-child'>{item.title}</h3>
                <h3 className='landing-feature-text landing-feature-child'>{item.text}</h3>
                <Button className="btn-landing-action landing-feature-child" onClick={e=> {
                    window.location = item.link;
                }}>{t('learn_more')}</Button>
            </div>
        )
    }

    const {landingData} = props;
        
    const itemsArr = landingData && landingData.features ? Object.values(landingData.features) : defaultFeatures;

    return (
        <div className='container'>
            <Row className='landing-content-layout'>
                {itemsArr.map((item) => (
                    <Col lg={4} sm={6} xs={12}>
                        {renderFeatureItem(item)}
                    </Col>
                ))}
            </Row>
        </div>
    );
}