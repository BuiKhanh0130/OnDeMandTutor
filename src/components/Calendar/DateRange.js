import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

export default function useDateRange() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [startDateInput, setStartDateInput] = useState();
    const [endDateInput, setEndDateInput] = useState();

    const handleSelect = (ranges) => {
        const { selection } = ranges;
        setStartDate(selection.startDate);
        setEndDate(selection.endDate);
        setStartDateInput(selection.startDate ? format(selection.startDate, 'yyyy-MM-dd') : '');
        setEndDateInput(selection.endDate ? format(selection.endDate, 'yyyy-MM-dd') : '');
    };

    return (
        <DateRange
            editableDateInputs={true}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={[{ startDate, endDate, key: 'selection' }]}
            minDate={new Date()}
        />
    );
}
