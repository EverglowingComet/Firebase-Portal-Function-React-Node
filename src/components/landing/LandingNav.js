import logoImage from 'assets/img/icons/logo.png';
import React, { useRef, useEffect, useState } from "react";
import { t } from "i18next";
import { connect } from 'react-redux';
//import { MdMenu, MdClose } from 'react-icons/md';
import { RiAdminFill } from 'react-icons/ri';
import { Button } from 'reactstrap';
import { userActions } from 'store/actions';

function LandingNav(props) {

    const [windowWidth, setWindowWidth] = useState(false);
    /* const [headerTransparent, setHeaderTransparent] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showAuth, setShowAuth] = useState(false); */
    const innerRef = useRef(null);
    
    const updateDimensions = () => {
        setWindowWidth(window.innerWidth);
    }

    /*
    const handleScroll = (event) => {
        let scrollTop = window.pageYOffset;
    
        setHeaderTransparent(scrollTop < 60)
    }
    */

    useEffect(() => {
        const div = innerRef.current;
        
        div.addEventListener("resize", updateDimensions);
        //div.addEventListener("scroll", handleScroll);
        return () => {
            div.removeEventListener("resize", updateDimensions);
            //div.removeEventListener("scroll", handleScroll);
        };
    }, [])

    const {location} = props;
        
    const homeLink = "/";
    // const individualLink = homeLink + '/individual';
    // const retailerLink = homeLink + '/retailer';
    // const helperLink = homeLink + '/helper';

    const barClasses = "landing-nav-container container";
    
    const icon = logoImage;
    
    return (
        <div className='landing-nav-wrapper' ref={innerRef}>
            <div className={barClasses}>
                <a className='landing-nav-main' href={homeLink}>
                    <img src={icon} className="landing-nav-icon" alt='logo'/>
                </a>
                {/* <ul class='landing-nav-links'>
                    
                    <li class='landing-nav-li'>
                        <a 
                        href={individualLink} 
                        className={location === 'individual' ? "org-a-active" : "org-a"}>
                            {t('individuals')}
                        </a>
                    </li>
                    <li class='landing-nav-li'>
                        <a 
                        href={retailerLink} 
                        className={location === 'retailer' ? "org-a-active" : "org-a"}>
                            {t('retailers')}
                        </a>
                    </li>
                    <li class='landing-nav-li'>
                        <div  
                        className={location === 'helper' ? "org-a-active" : "org-a"} onClick={e=>{
                            if (!user) {
                                this.setState({show: true});
                            } else {
                                window.location = "/helper";
                            }
                        }}>
                            {t('become_a_helper')}
                        </div>
                    </li>
                </ul> */}
                <div className='wrap-content-fill-child' />
                {location !== 'book' && (
                <div className='landing-nav-action'>
                    <Button className="btn-landing-action" onClick={e=>{
                        /*if (!user) {
                            this.setState({showAuth: true});
                        } else {
                            window.location = "/book";
                        }*/
                        window.location = "/dashboard";
                    }}>{windowWidth < 768 ? <RiAdminFill/> : t('dashboard')}</Button>
                </div>
                )}
            </div>
        </div>
    );
}

function mapState(state) {
    const { user, loggingIn } = state.auth;

    return { user, loggingIn };
}

const actionCreators = {
    register: userActions.register,
    login: userActions.login,
    logout: userActions.logout,
    sendResetEmail: userActions.sendResetEmail,
}

const connectedLandingNav = connect(mapState, actionCreators)(LandingNav);
export { connectedLandingNav as LandingNav };
