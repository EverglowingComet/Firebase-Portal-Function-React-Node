import { useEffect, useState } from "react";
import { t } from "i18next";
import { userActions } from 'store/actions';
import { connect } from 'react-redux';
import { Outlet, useNavigate } from "react-router-dom";
import AuthForm, { STATE_LOGIN } from "components/auth/AuthForm";
import logoImage from 'assets/image/app_icon.png';
import userImage from 'assets/img/icons/player_photo_default.png';

import { 
    MdDashboard,
    MdSettings,
} from 'react-icons/md';
import { 
    RiGalleryLine,
} from 'react-icons/ri';
import { IoMdMenu } from 'react-icons/io';
import SideMenu from "components/SideMenu";


const floatingThres = 875;

function DashboardPage(props) {
    const navigate = useNavigate();

    const [authState, setAuthState] = useState(STATE_LOGIN)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isOpened, setIsOpened] = useState(false);

    useEffect(() => {
        
        window.addEventListener("resize", updateDimensions);
        return () => {
            window.removeEventListener("resize", updateDimensions);
        };
    }, []);

    const updateDimensions = () => {
        setWindowWidth(window.innerWidth);
    }

    const renderSideMenu = () => {

        const mainMenuItem = 
        {
            icon: <MdDashboard />,
            title: t('dashboard'),
            link: "/dashboard"
        }
    
        const menuItems = [
            {
                icon: <RiGalleryLine />,
                title: t('gallery'),
                link: "/gallery"
            },
        ]
    
        return (
            <SideMenu
                mainItem={mainMenuItem}
                menuItems={menuItems}
                title={t('spark_dx')}
                floating={windowWidth < floatingThres}
                isOpened={isOpened}
                onClose={e=> {
                    setIsOpened(false);
                }} />
        );
    }

    const renderHeader = () => {
        const { user } = props;

        return (
            <div className='dashboard-header'>
                {windowWidth < floatingThres && (
                <div className='dashboard-header-settings'
                    onClick={e=> {
                        setIsOpened(true)
                    }} >
                    <IoMdMenu />
                </div>
                )}
                <img 
                    className='dashboard-header-icon' 
                    src={logoImage} 
                    alt="logo" />
                <div className='dashboard-header-title'>
                    {t('dashboard')}
                </div>
                <div className='dashboard-header-settings'
                    onClick={e=> {
                        navigate("/dashboard/settings");
                    }} >
                    <MdSettings />
                </div>
                <img 
                    className='dashboard-header-user' 
                    src={user && user.photoUri ? user.photoUri : userImage} 
                    alt="user"
                    onClick={e=> {
                        navigate("/my_account");
                    }} />
            </div>
        )
    }

    const renderOutlet = () => {
        const { user } = props;

        if (!user || !user.uid) {
            return (
            <div className="container">
                <AuthForm
                    logoTitle={t("invite_form_title")} 
                    authState={authState} 
                    changeAuthState={(update) => setAuthState(update)}
                    />
            </div>
            )
        }
        return <Outlet />
    }

    return (
        <div className='wrap-content-parent-fixed'>
            <div className='wrap-content-wrap-child-fixed'>
                {renderSideMenu()}
            </div>
            <div className='wrap-content-fill-child-fixed' style={{paddingLeft: 10, paddingRight: 10}}>
                {renderHeader()}
                {renderOutlet()}
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

export default connect(mapState, actionCreators) (DashboardPage)