import React from 'react';
import defaultIcon1 from 'assets/img/icons/helper-smiling1.jpg';
import { t } from "i18next";
import { Row, Col, Button } from 'reactstrap';

export function Income(props) {

    const defaultIncome =
    {
        id: '1',
        title: t('income_title_1'),
        text: t('income_text_1'),
        icon: defaultIcon1,
        link: 'move'
    };
    
    const {landingData} = props;
    const income = landingData && landingData.income ? landingData.income : defaultIncome;

    return (
        <div className='container'>
            <Row className='landing-income-layout' style={{margin: 0}}>
                <Col sm={8} xs={12} className='landing-income-wrapper'>
                    <div className='landing-income-item'>
                        <h3 className='landing-income-title'><span style={{color: '#80A9F8'}}>{income.title}</span> {income.text}</h3>
                        <Button className="btn-landing-link">{t('income_action_1')}</Button>
                    </div>
                </Col>
                <Col sm={4} xs={12} style={{padding: 0}}>
                    <img className='landing-income-icon' alt="icon" src={income.icon} />
                </Col>
            </Row>
        </div>
    );
}