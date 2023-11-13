import AuthForm, { STATE_SIGNUP } from "components/auth/AuthForm";
import { t } from "i18next";
import { useParams } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";

export default function InvitePage() {
    const params = useParams();
    const email = params.email;

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
                        logoTitle={t("invite_form_title")} 
                        authState={STATE_SIGNUP} 
                        authEmail={email} 
                        />
                </Card>
            </Col>
        </Row>
    )
}