import classNames from 'classnames/bind';
import MultiRangeSlider from 'multi-range-slider-react';

import styles from './MultiRangeSliderInput.module.scss';

const cx = classNames.bind(styles);

function MultiRangeSliderInput({ min, max, step, minValueAge, maxValueAge, onInput }) {
    return (
        <MultiRangeSlider
            min={min}
            max={max}
            step={step}
            minValue={minValueAge}
            maxValue={maxValueAge}
            label={false}
            ruler={false}
            onInput={onInput}
            barLeftColor={'transparent'}
            barRightColor={'transparent'}
            barInnerColor={'#000'}
            className={cx('sidebar__items-hours-multiRange')}
        />
    );
}

export default MultiRangeSliderInput;
