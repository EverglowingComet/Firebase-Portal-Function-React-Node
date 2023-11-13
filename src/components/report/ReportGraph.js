
import { t } from "i18next";
import { LineChart } from '@mui/x-charts/LineChart';
import { Input, } from "reactstrap";
import { useRef, useState } from "react";
import { DAY_TIME, MONTH_TIME, formatByDecimalFloating, toDateString } from "utils/Utils";

export default function ReportGraph(props) {
    const { items } = props;
    const [graphPeriod, setGraphPeriod] = useState(0);

    const innerRef = useRef(null);

    const timeFormatter = (timestamp) => {
        return toDateString(timestamp)
    }

    const valueFormatter = (value) => {
        return formatByDecimalFloating(value,2) + "ml";
    }

    const width = innerRef.current ? innerRef.current.offsetWidth : 500;

    let xData = [];
    let yData = [];
    let dataToShow = false;

    let inPeriod = [];
    let maxDate = 0;
    let minDate = 0;
    for (const item of items) {
        if (item.timestamp > maxDate) {
            maxDate = item.timestamp;
        }
        if (item.timestamp > 0 && (item.timestamp < minDate || minDate === 0)) {
            minDate = item.timestamp;
        }
    }
    for (const item of items) {
        if (graphPeriod <= 0 || item.timestamp > maxDate - graphPeriod * MONTH_TIME) {
            inPeriod.push(item)
        }
    }
    const xAxisStep = (graphPeriod <= 0 ? parseInt((maxDate - minDate) / 5) : (DAY_TIME * 7 * graphPeriod));

    let xValue = [];
    let highValue = [];
    let lowValue = [];
    let bpmValue = [];
    for (const item of inPeriod) {
        if (item.timestamp) {
            xValue.push(item.timestamp);
            highValue.push(item.highValue);
            lowValue.push(item.lowValue);
            bpmValue.push(item.heartValue);
        }
    }
    xData.push(
        {
            data: xValue,
            valueFormatter: timeFormatter,
            tickMinStep: xAxisStep,
            scaleType: 'time'
        }
    );
    yData.push(
        {
            label: t('systolic'),
            data: highValue,
            valueFormatter: valueFormatter
        },
        {
            label: t('diabolic'),
            data: lowValue,
            valueFormatter: valueFormatter
        },
        {
            label: t('pulse'),
            data: bpmValue,
        },
    );
    dataToShow = xValue.length > 0;
    return (
        <div className="shadow-tile" ref={innerRef}>
            <div className="wrap-content-parent">
                <h3 className="report-table-filter-title">
                    {t('period')}: 
                </h3>
                <div className='report-table-filter'>
                    <Input type="select" className='form-control' placeholder={t('test_type')} name="testType" id="testType" onChange={e => {
                        setGraphPeriod(parseInt(e.target.value));
                    }} value={graphPeriod}>
                        <option value={0}>{t('all')}</option>
                        <option value={1}>{t('latest_1_month')}</option>
                        <option value={2}>{t('latest_2_months')}</option>
                        <option value={3}>{t('latest_3_months')}</option>
                    </Input>
                </div>
            </div>
            {dataToShow ? (
            <LineChart
                xAxis={xData}
                series={yData}
                width={width}
                height={width * 0.8} />
            ) : (
            <div className="dashboard-content-empty">
            {t('no_data')}
            </div>
            )}
        </div>
    );
}