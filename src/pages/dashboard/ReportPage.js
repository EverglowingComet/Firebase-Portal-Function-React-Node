import { useEffect, useState } from "react";
import { t } from "i18next";
import { userActions } from 'store/actions';
import { connect } from 'react-redux';
import { invokeHttpsApi } from "utils/API";
import { sortByUsername } from "utils/Utils";
import { Col, Input, Row, Spinner } from "reactstrap";
import GalleryCell from "components/report/GalleryCell";

import ReportGraph from "components/report/ReportGraph";

const REPORT_MODE_ARRAY = [
    {id: "none", title: "No Filter"}
]

function ReportPage(props) {
    const { user } = props;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false)
    const [playerChoice, setPlayerChoice] = useState(null);
    const [filterChoice, setFilterChoice] = useState(null);
    const [graphFilter, setGraphFilter] = useState("none");

    useEffect(() => {
        
        const loadContents = () => {
            const params = {};
            
            setLoading(true)
            invokeHttpsApi("delivery-galleryQuery", params, (dict) => {
                setData(dict)
                setLoading(false);
            }, (error) => {
                setLoading(false);
            })
        }

        loadContents();
        return () => {
            clearContents();
        };
    }, [props.user]);

    const clearContents = () => {

    }

    const renderGraph = () => {
        const uid = playerChoice ? playerChoice.uid : user.uid;
        let array = [];
        if (data && data.items) {
            for (const item of Object.values(data.items)) {
                if (uid === item.uid && graphFilter === item.type) {
                    array.push(item);
                }
            }
        }
        return (
            <div>
                <div className="gallery-table-header">
                    <h3 className="gallery-table-title">
                        {t('report_graph')}
                    </h3>
                    <h3 className="gallery-table-filter-title">
                        {t('mode')}: 
                    </h3>
                    <div className='gallery-table-filter'>
                        <Input type="select" className='form-control' placeholder={t('test_type')} name="testType" id="testType" onChange={e => {
                            setGraphFilter(e.target.value === "" ? null : e.target.value);
                        }} value={graphFilter ? graphFilter : ""}>
                            {REPORT_MODE_ARRAY.map((v,i) => (
                            <option key={i} value={v}>{v.title}</option>
                            ))}
                        </Input>
                    </div>
                </div>
                <ReportGraph
                    type={graphFilter}
                    items={array} />
            </div>
        )
    } 

    const renderGalleryItem = (item) => {
        return (
            <GalleryCell item={item} />
        );
    }

    const renderTable = () => {

        const uid = playerChoice ? playerChoice.uid : user.uid;
        let array = [];
        let items = [];
        if (data && data.galleryList) {
            for (const item of Object.values(data.galleryList)) {
                if (uid === item.uid && (filterChoice == null || filterChoice === item.type)) {
                    array.push(item);
                }
            }
        }
        for (const item of array) {
            items.push(renderGalleryItem(item));
        }

        return (
            <div>
                <div className="gallery-table-header">
                    <h3 className="gallery-table-title">
                        {t('report_table')}
                    </h3>
                    <h3 className="gallery-table-filter-title">
                        {t('mode')}: 
                    </h3>
                    <div className='gallery-table-filter'>
                        <Input type="select" className='form-control' placeholder={t('test_type')} name="testType" id="testType" onChange={e => {
                            setFilterChoice(e.target.value === "" ? null : e.target.value);
                        }} value={filterChoice ? filterChoice : ""}>
                            <option value="">{t('all')}</option>
                            {REPORT_MODE_ARRAY.map((v,i) => (
                            <option key={i} value={v}>{t.title}</option>
                            ))}
                        </Input>
                    </div>
                </div>
                <div className="gallery-items-list">
                    {items}
                </div>
            </div>
        );
    }
    let users = {};
    if (data && data.patients) {
        users = data.patients;
    } else if (data && data.doctors) {
        users = data.doctors;
    }

    let patientsArr = [];
    for (const item of Object.values(users)) {
        patientsArr.push(item);
    }
    sortByUsername(patientsArr);

    return (
        <div className="reports-layout">
            <h3 className="dashboard-content-title">
                {t('reports')}
            </h3>
            {user && user.type === "doctor" && (
            <Row className='form-edit-row'>
                <Col className='form-edit-label' sm={5} xs={12}>
                {t('patient_choice')}
                </Col>
                <Col className='form-edit-entry' sm={7} xs={12}>
                    <div className='form-edit-input'>
                    <Input type="select" className='form-control' placeholder={t('test_type')} name="testType" id="testType" onChange={e => {
                        const update = users[e.target.value];
                        setPlayerChoice(update);
                    }} value={playerChoice ? playerChoice.uid : ""}>
                        <option value="">{t('myself')}</option>
                        {patientsArr.map((v,i) => (
                        <option key={i} value={v.uid}>{v.username}</option>
                        ))}
                    </Input>
                    </div>
                </Col>
            </Row>
            )}
            {loading ? (
            <div className="dashboard-content-empty">
                <Spinner color="primary" />
            </div>
            ) : (
            <div className="dashboard-contents-layout">
                <Row style={{margin: 0}}>
                    <Col lg={6} sm={12}>
                        {renderGraph()}
                    </Col>
                    <Col lg={6} sm={12}>
                        {renderTable()}
                    </Col>
                </Row>
            </div>
            )}
        </div>
    )
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

export default connect(mapState, actionCreators) (ReportPage)