import { t } from 'i18next';
import { useState } from 'react';
import { MdExpandLess, MdExpandMore, MdLogout } from 'react-icons/md';
import {
    useLocation,
    useNavigate,
} from "react-router-dom";
import { connect } from 'react-redux';
import { userActions } from 'store/actions';
import { removeFromArr } from 'utils/Utils';

function SideMenu(props) {
    const [openedLinks, setOpenedLinks] = useState([]);
    let location = useLocation();
    let navigate = useNavigate();

    const renderMainMenuItem = () => {
        const { mainItem } = props;
        const path = location.pathname;

        return (
            <div className={`side-menu-item-main ${path === mainItem.link ? "selected" : ""}`} onClick={e=> {
                navigate(mainItem.link);
            }}>
                {mainItem.icon &&
                <div className='side-menu-item-icon'>
                    {mainItem.icon}
                </div>
                }
                <div className='side-menu-item-title'>
                    {mainItem.title}
                </div>
            </div>
        )

    }

    const renderMenuItem = (item) => {
        const { mainItem } = props;
        const path = location.pathname;
        const linkTo = mainItem.link + item.link;
        const selected = path.startsWith(linkTo);
        const opened = openedLinks.includes(item.link);

        return (
            <div key={item.link}>
                <div className={`side-menu-item ${selected ? "selected" : ""}`} onClick={e=> {
                    const update = [];
                    update.push(openedLinks);
                    if (item.children) {
                        if (!update.includes(item.link)) {
                            update.push(item.link);
                        } else {
                            removeFromArr(update, item.link)
                        }
                        setOpenedLinks(update);
                    } else {
                        navigate(linkTo);
                    }
                }}>
                    {item.icon &&
                    <div className='side-menu-item-icon'>
                        {item.icon}
                    </div>
                    }
                    <div className='side-menu-item-title'>
                        {item.title}
                    </div>
                    {item.children &&
                    <div className='side-menu-item-icon'>
                        {selected || opened ? <MdExpandMore/> : <MdExpandLess/>}
                    </div>
                    }
                </div>
                {item.children && (selected || opened) && (
                    <div key="children">
                    {item.children.map((child, idx) => (
                        renderMenuItemChild(item, child)
                    ))}
                    </div>
                )}
            </div>
        )

    }

    const renderMenuItemChild = (item, child) => {
        const { mainItem } = props;
        const path = location.pathname;
        const linkTo = mainItem.link + item.link + child.link;
        const selected = path.startsWith(linkTo);

        return (
            <div key={child.link}>
                <div className={`side-menu-item-child ${selected ? "selected" : ""}`} onClick={e=> {
                    navigate(linkTo);
                }}>
                    {child.icon &&
                    <div className='side-menu-item-icon'>
                        {child.icon}
                    </div>
                    }
                    <div className='side-menu-item-title'>
                        {child.title}
                    </div>
                </div>
            </div>
        )

    }

    const renderLogoutBtn = () => {
        return (
            <div key="logout">
                <div className={`side-menu-item`} onClick={e=> {
                    props.logout();
                }}>
                    <div className='side-menu-item-icon'>
                        <MdLogout />
                    </div>
                    <div className='side-menu-item-title'>
                        {t('logout')}
                    </div>
                </div>
            </div>
        )
    }

    const renderNormalMenu = () => {
        const { icon, title, menuItems } = props;

        return (
            <div className='side-menu-contents'>
                <div className='side-menu-header' onClick={e=> {navigate("/")}}>
                    {icon && <img className='side-menu-header-icon' src={icon} alt='icon' />}
                    <div className='side-menu-header-title'>
                        {title}
                    </div>
                </div>

                {renderMainMenuItem()}
                <div className='side-menu-items'>
                    {menuItems.map((item, idx) => (
                        renderMenuItem(item)
                    ))}
                    {renderLogoutBtn()}
                </div>
            </div>
        )
    }

    const { isOpened, floating, onClose } = props;

    if (floating && isOpened) {
        return (
            <div className='side-menu-floating'>
                <div className='side-menu-pane'>
                    {renderNormalMenu()}
                </div>
                <div className='wrap-content-fill-child'  onClick={e => {
                    e.stopPropagation();
                    if (onClose != null) {
                        onClose();
                    }
                }}/>
            </div>
        );
    }
    if (!floating) {
        return (
            <div className='side-menu-pane'>
                {renderNormalMenu()}
            </div>
        );
    }
    return <div/>;
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

export default connect(mapState, actionCreators) (SideMenu)