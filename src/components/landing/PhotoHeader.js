import React from 'react';
import defaultBg from 'assets/img/icons/fund_image_land.jpg';
import { t } from "i18next";
import { Row, Col } from 'reactstrap';
import appStore from "assets/image/app_store_icon.png";
import playStore from "assets/image/play_store_icon.png";

export function PhotoHeader(props) {
    const {landingData} = props;

    const backgroundImage = landingData ? (landingData.mainPhoto ? landingData.mainPhoto : defaultBg) : defaultBg;

    return (
        <div className='landing-photo-header'>
            <img className='landing-photo-header-image' alt={t('loading')} src={backgroundImage} />
            <div className='landing-photo-header-overlay' />
            <div className='landing-photo-header-content container'>
                <div style={{position: 'relative', height: '100%'}}>
                    <Row className='landing-photo-info'>
                        <Col className='landing-photo-info-layout' lg={6} sm={8} xs={12}>
                            <h3 className='landing-photo-info-title'>
                                {t('photo_header_title')}
                            </h3>
                            <div className='landing-photo-info-text'>
                                {t('photo_header_text')}
                            </div>
                            <div className='landing-photo-actions-header'>
                                <a href="https://apps.apple.com/us/app/sparkdx/id6446060225">
                                    <img style={{height: 40}} src={appStore} alt="App Store" />
                                </a>
                                <a href="https://apps.apple.com/us/app/sparkdx/id6446060225">
                                    <img style={{height: 40}} src={playStore} alt="Play Store" />
                                </a>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}