import moment from 'moment';
import {Shift} from "../../../utils/types";

export function groupShiftsByMonth(shifts: Shift[]): { [month: string]: Shift[] } {
    const shiftsByMonth: { [month: string]: Shift[] } = {};
    shifts.forEach(shift => {
        const monthYear = moment(shift.start).format('MMM YYYY');
        if (!shiftsByMonth[monthYear]) {
            shiftsByMonth[monthYear] = [];
        }
        shiftsByMonth[monthYear].push(shift);
    });
    return shiftsByMonth;
}

export function sortMonths(shiftsByMonth: { [month: string]: Shift[] }): string[] {
    return Object.keys(shiftsByMonth).sort(
        (a, b) =>
            moment(a, 'MMM YYYY').valueOf() -
            moment(b, 'MMM YYYY').valueOf()
    );
}