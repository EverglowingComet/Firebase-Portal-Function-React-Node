import { AuthForm, STATE_LOGIN } from "components/auth/AuthForm";
import { useState } from "react";
import { Card, Col, Row } from "reactstrap";

export function AuthPage() {
    const [authState, setAuthState] = useState(STATE_LOGIN);

    return (
        <Row
            style={{
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 0
            }}>
            <Col md={6} lg={4}>
                <Card body>
                    <AuthForm
                        authState={authState} 
                        changeAuthState={(update) => {
                            setAuthState(update);
                        }} />
                </Card>
            </Col>
        </Row>
    )
}