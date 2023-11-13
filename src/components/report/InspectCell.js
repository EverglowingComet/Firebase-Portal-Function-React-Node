import { t } from "i18next";
import { formatByDecimalFloating, toDateTimeString } from "utils/Utils";
import { getModeStatusRes, getModeTitleId, getModeUnit, getPrimaryBgColor } from "utils/inspect";


export default function InspectCell(props) {
    const item = props.item;

    return (
        <div className="report-item-wrapper" style={{backgroundColor: getPrimaryBgColor(item.type)}}>
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
                    <div className="report-bp-info-item-value">
                        {formatByDecimalFloating(item.average)}
                    </div>
                    <div className="report-bp-info-item-title">
                        {getModeUnit(item.type)}
                    </div>
                </div>
                <div className="report-bp-info-item-range">
                    {t(getModeStatusRes(item))}
                </div>
            </div>
        </div>
    )
}