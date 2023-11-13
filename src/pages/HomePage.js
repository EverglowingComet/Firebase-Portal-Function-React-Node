import { useState } from "react";
import {LandingNav} from 'components/landing/LandingNav';
import {PhotoHeader} from 'components/landing/PhotoHeader';
import {FeaturedItems} from 'components/landing/FeaturedItems';
import {Service} from 'components/landing/Service';
import {Sponsers} from 'components/landing/Sponsers';
import {Income} from 'components/landing/Income';

export default function HomePage() {
    const [landingData, setLandingData] = useState({})
    if (false) {
        setLandingData({})
    }

    return (
        <div>
            <LandingNav landingData={landingData} />
            <PhotoHeader landingData={landingData} />
            <FeaturedItems  landingData={landingData}/>
            <Service  landingData={landingData}/>
            <Sponsers  landingData={landingData}/>
            <Income  landingData={landingData}/>
            <div style={{width: '100%', height: 40}} />
        </div>
    );

}