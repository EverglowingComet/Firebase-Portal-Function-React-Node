import React from 'react';
import defaultIcon1 from 'assets/img/icons/logo-sams-club.svg';
import defaultIcon2 from 'assets/img/icons/logo-quilt-biglots.svg';
import defaultIcon3 from 'assets/img/icons/logo-tcs-vertical.svg';
import defaultIcon4 from 'assets/img/icons/logo-quilt-purple.svg';
import defaultIcon5 from 'assets/img/icons/logo-quilt-costco.svg';
import defaultIcon6 from 'assets/img/icons/logo-quilt-rove.svg';
import { Row, Col } from 'reactstrap';

export function Sponsers(props) {

    const defaultSponsers = [
        {
            id: '1',
            icon: defaultIcon1,
            link: 'move'
        },
        {
            id: '2',
            icon: defaultIcon2,
            link: 'deliver'
        },
        {
            id: '3',
            icon: defaultIcon3,
            link: 'deliver'
        },
        {
            id: '4',
            icon: defaultIcon4,
            link: 'deliver'
        },
        {
            id: '5',
            icon: defaultIcon5,
            link: 'deliver'
        },
        {
            id: '6',
            icon: defaultIcon6,
            link: 'deliver'
        },
    ]
    
    function renderFeatureItem(item) {
        return (
            <div className='landing-sponser-item'>
                <img className='landing-sponser-icon' alt="icon" src={item.icon} />
            </div>
        )
    }

    const {landingData} = props;
    const itemsArr = landingData && landingData.sponsers ? Object.values(landingData.sponsers) : defaultSponsers;

    return (
        <div className='container'>
            <Row className='landing-content-layout'>
                {itemsArr.map((item) => (
                    <Col lg={2} sm={4} xs={6}>
                        {renderFeatureItem(item)}
                    </Col>
                ))}
            </Row>
        </div>
    );
}