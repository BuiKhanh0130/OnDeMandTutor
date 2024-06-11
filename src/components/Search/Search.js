import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { useState, useRef } from 'react';

import { SearchIcon, ClearIcon, LoadingIcon } from '~/components/Icons';
import Button from '~/components/Button';
import Popper from '../Popper';

import styles from './Search.module.scss';

const cx = classNames.bind(styles);
function Search({ width, className, ...passProps }) {
    const [searchValue, setSearchResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const inputRef = useRef();

    const handleSearch = (e) => {
        const searchValue = e.target.value;

        if (searchValue.startsWith(' ') /* !searchValue.trim() và không có giá trị */) {
            return;
        }

        setSearchResult(searchValue);
    };

    const handleClear = () => {
        setSearchResult('');
        inputRef.current.focus();
    };

    const handleShowResult = () => {
        setShowResult(true);
    };

    const handleHiddenResult = () => {
        setShowResult(false);
    };

    return (
        <HeadlessTippy
            interactive
            appendTo={() => document.body}
            visible={showResult}
            offset={[-35, 1]}
            placement="bottom"
            onClickOutside={handleHiddenResult}
            render={(attrs) => (
                <div className={cx('search_results')} style={{ width: width }} tabIndex="-1" {...attrs}>
                    <Popper>
                        <ul className={cx('search_list')}>
                            <li>Math</li>
                            <li>Physics</li>
                            <li>Geography</li>
                            <li>Javascript</li>
                            <li>HTML</li>
                            <li>CSS</li>
                            <li>Hi Chao Cau</li>
                        </ul>
                    </Popper>
                </div>
            )}
        >
            <div className={cx('SearchPanel_left-search', { className })}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    type="text"
                    className={cx('SearchPanel_left-search-ip', { className })}
                    placeholder="What would you like to learn?"
                    onChange={handleSearch}
                    onFocus={handleShowResult}
                ></input>
                {searchValue && (
                    <div className={cx('SearchPanel_left-search-icc')} onClick={handleClear}>
                        <ClearIcon />
                    </div>
                )}
                {loading && (
                    <div className={cx('SearchPanel_left-search-icl')}>
                        <LoadingIcon />
                    </div>
                )}
                <Button orange small className={cx('SearchPanel_left-search-ics')}>
                    <SearchIcon />
                </Button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
