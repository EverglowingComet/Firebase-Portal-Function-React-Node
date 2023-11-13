import { t } from "i18next";
import { formatByDecimalFloating, toDateTimeString } from "utils/Utils";
import { getModeTitleId } from "utils/inspect";


export default function ExperimentCell(props) {
    const item = props.item;

    return (
        <div className="report-item-wrapper">
            <div>
                <h4 className="report-item-title">
                    {t(getModeTitleId(item.type))}
                </h4>
                <div className="report-item-date">
                    {toDateTimeString(item.timestamp)}
                </div>
            </div>
            <div className="report-item-info">
                <div className="report-bp-info-item">
                    <div className="report-bp-info-item-title">
                        {t('systolic')}
                    </div>
                    <div className="report-bp-info-item-value">
                        {formatByDecimalFloating(50)}
                    </div>
                </div>
            </div>
        </div>
    )
}