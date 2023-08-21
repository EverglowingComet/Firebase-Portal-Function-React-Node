import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label, Spinner } from 'reactstrap';
import { t } from 'i18next';
import logoImage from 'assets/image/app_icon.png';
import userImage from 'assets/image/player_photo_default.png';
import { login, logout, register, sendResetEmail } from 'store/user';
import { useDispatch, useSelector } from 'react-redux';

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';
export const STATE_FORGOT = 'FORGOT';

export function AuthForm(props) {
    const {
        authState,
        authEmail,
        buttonText,
        logoIcon, 
        logoTitle, 
        onLogoClick, 
        changeAuthState, 
    } = props;
	const dispatch = useDispatch();

    const user = useSelector((state) => state.user.value);
    const loggingIn = useSelector((state) => state.user.loggingIn);
    
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(authEmail);
    const [password, setPassword] = useState(null);
    const [confirm, setConfirm] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        setSubmitted(true);
        if (authState === STATE_SIGNUP) {
            if (!authEmail && (!username || username === '')) {
                alert(t('username_empty'));
                return;
            }
            if (email == null || email === '') {
                alert(t('email_empty'));
                return;
            }
            if (password == null || password === '') {
                alert(t('password_empty'));
                return;
            }
            if (password !== confirm) {
                alert(t('password_not_match'));
                return;
            }
            const user = {
                username: username,
                password: password,
                email: email,
            }

            dispatch(register(user));

        } else if (authEmail === STATE_FORGOT) {
            dispatch(sendResetEmail(email));
        } else {
            if (email == null || email === '') {
                alert(t('email_empty'));
                return;
            }
            if (password == null || password === '') {
                alert(t('password_empty'));
                return;
            }
            dispatch(login({
                email: email,
                password: password,
            }))
        }
    }

    const renderButtonText = () => {

        if (!buttonText && authState === STATE_LOGIN) {
            return t('login');
        }

        if (!buttonText && authState === STATE_SIGNUP) {
            return t('sign_up');
        }

        if (!buttonText && authState === STATE_FORGOT) {
            return t('forgot_password');
        }

        return buttonText;
    }

    if (user && user.uid) {
        const icon = user.photoUri ? user.photoUri : userImage;

        return (
            <Form className='auth-wrapper'>
                <div className="text-center pb-4">
                    <img
                        src={icon}
                        className="rounded-circle"
                        style={{ width: 60, height: 60, cursor: 'pointer', border: '1px solid rgb(0, 0, 0)' }}
                        alt="logo"
                    />
                </div>
                <h3 className='quick-setup-side-header-title text-center' style={{marginBottom: 40}}>
                    {user.username}
                </h3>
                <div className='text-center'>
                    <Button
                        className="btn-cancel"
                        onClick={(e)=> {
                            dispatch(logout());
                        }}>
                        {t('logout')}
                    </Button>
                </div>

            </Form>
        )
    }

    return (
        <Form className='auth-wrapper' onSubmit={handleSubmit}>
            <div className="text-center pb-4">
                <img
                    src={logoIcon ? logoIcon : logoImage}
                    className="rounded"
                    style={{ width: 60, height: 60, cursor: 'pointer' }}
                    alt="logo"
                    onClick={onLogoClick}
                />
                {logoTitle && (
                    <h3 className='text-center'>{logoTitle}</h3>
                )}
            </div>
            {authState === STATE_SIGNUP && (
            <FormGroup>
                <Label for='full_name'>{t('full_name')}</Label>
                <Input 
                    name="username" 
                    placeholder={t('your_name')}
                    type="text" 
                    value={username} 
                    onChange={e => {
                        setUsername(e.target.value)
                    }} />
                {submitted && !username &&
                    <div className="help-block">{t('username_empty')}</div>
                }
            </FormGroup>
            )}
            <FormGroup>
                <Label for='email'>{t('email')}</Label>
                <Input 
                    name="email" 
                    placeholder='your@email.com'
                    type="email" 
                    value={(!email || email === '') && authEmail ? authEmail : email}
                    onChange={e => {
                        if (authEmail && authState === STATE_SIGNUP) {
                            return;
                        }
                        setEmail(e.target.value)
                    }} />
                {submitted && !email && !authEmail && 
                    <div className="help-block">{t('email_empty')}</div>
                }
            </FormGroup>
            {authState !== STATE_FORGOT && (
            <FormGroup>
                <Label name="password">{t('password')}</Label>
                <Input 
                    name="password" 
                    placeholder={t('password')}
                    type="password" 
                    value={password} 
                    autoComplete="on"
                    onChange={e => {
                        setPassword(e.target.value)
                    }} />
                {submitted && !password &&
                    <div className="help-block">{t('password_empty')}</div>
                }
            </FormGroup>
            )}
            {authState === STATE_SIGNUP && (
                <FormGroup>
                    <Label for="confirm">{t('confirm_password')}</Label>
                    <Input 
                        name="confirm" 
                        placeholder={t('confirm_your_password')}
                        type="password" 
                        autoComplete="on"
                        value={confirm} 
                        onChange={e => {
                            setConfirm(e.target.value)
                        }} />
                </FormGroup>
            )}
            
            <hr />
            {loggingIn ? (
                <div className='text-center'>
                    <Spinner color="primary" />
                </div>
            ) : (
                <div className='text-center'>
                    <Button
                        className="btn-blue"
                        onClick={handleSubmit}>
                        {renderButtonText()}
                    </Button>
                </div>
            ) }

            {changeAuthState && (
            <div className="text-center pt-1">
                <h6>or</h6>
                <h6>
                    {authState !== STATE_LOGIN && (
                        <a href="#login" onClick={ e => {
                            changeAuthState(STATE_LOGIN)
                        }}>
                            {t('login')}
                        </a>
                    )}
                </h6>
                <h6>
                    {authState !== STATE_SIGNUP && (
                        <a href="#login" onClick={ e => {
                            changeAuthState(STATE_SIGNUP)
                        }}>
                            {t('sign_up')}
                        </a>
                    )}
                </h6>                    
                <h6>
                    {authState !== STATE_FORGOT && (
                        <a href="#login" onClick={ e => {
                            changeAuthState(STATE_FORGOT)
                        }}>
                            {t('forgot_password')}
                        </a>
                    )}
                </h6>
            </div>
            )}
        </Form>
    );
}