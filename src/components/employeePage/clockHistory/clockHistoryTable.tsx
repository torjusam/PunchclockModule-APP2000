/*
    Author: Torjus A.M
    Component that generates rows for the table of employees clock history.
*/
import React, { FC } from 'react';
import { Employee } from '../../../lib/employee';
import { formatDay } from '../../../lib/dateFormatter';
import ArrowIn from '../../../lib/assets/svg/arrowIn.svg';
import ArrowOut from '../../../lib/assets/svg/arrowOut.svg';
import useClockHistory from '../../../hooks/useClockHistory';
import { ClockHistoryData } from '../../../lib/types';
import moment from 'moment';
import 'moment/locale/nb';
import styles from './clockHistory.module.css';

// Moment library: NB = Norwegian Bokmål
moment.locale('nb');

interface ClockHistoryTableProps {
    data: Array<ClockHistoryData>;
    isLoading: boolean;
}

const ClockHistoryTable: FC<ClockHistoryTableProps> = ({ data, isLoading }) => {
    // Renders 7 rows.
    const renderRows = () => {
        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (!data) {
            return <div>No data available</div>;
        }

        return data.map((entry, i) => (
            <div key={i} className={styles.tableRow}>
                <div className={`${styles.rowItem} ${styles.date}`}>
                    <h1>{moment.utc(entry.checkin).format('DD')}</h1>
                    <h2>{moment(entry.checkin).format('ddd')}</h2>
                </div>
                <div className={styles.rowSubContainer}>
                    <div className={styles.rowItem}>
                        <ArrowIn className={styles.icon} />
                        <h1>{moment.utc(entry.checkin).format('LT')}</h1>
                    </div>
                    <div className={styles.rowItem}>
                        <ArrowOut className={styles.icon} />
                        <h1>{entry.checkout ? moment.utc(entry.checkout).format('LT') : '-'}</h1>
                    </div>
                </div>
                <div className={styles.rowItem}>
                    <h3>{entry.workinterval ? `${entry.workinterval.hours}t ${entry.workinterval.minutes}m` : '-'}</h3>
                </div>
                <div className={styles.rowItem}>
                    <h3 style={{ color: '#0DB714' }}>{entry.overtimeinterval ? `${entry.overtimeinterval.hours}t ${entry.overtimeinterval.minutes}m` : '+00t 00m'}</h3>
                </div>
            </div>
        ));
    };

    return (
        <>
            <div className={styles.tableContainer}>
                <div className={`${styles.tableRow} ${styles.heading}`}>
                    <div className={styles.rowItem}>Dato</div>
                    <div className={styles.rowItem}>Stempling</div>
                    <div className={styles.rowItem}>Arbeidstid</div>
                    <div className={`${styles.rowItem}`} style={{ color: '#0DB714' }}>Fleks Saldo</div>
                </div>
                {renderRows()}
            </div>
        </>
    );
};

export default ClockHistoryTable;