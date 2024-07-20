import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { useState, useRef, useEffect, useContext } from 'react';

import { ClearIcon, LoadingIcon } from '~/components/Icons';
import requests from '~/utils/request';
import Popper from '../Popper';
import { ModalContext } from '../ModalProvider';

import styles from './Search.module.scss';
import useDebounce from '~/hooks/useDebounce';
import { useLocation, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
const SEARCH_URL = 'subject-group/suggest';

function Search({ width, className, ...passProps }) {
    const location = useLocation();
    const navigate = useNavigate();
    //Value search
    const { searchItem, setSearchItem } = useContext(ModalContext);
    // rotate
    const [loading, setLoading] = useState(false);
    // check have result or not
    const [showResult, setShowResult] = useState(false);
    // result search
    const [searchResults, setSearchResults] = useState();

    const inputRef = useRef();

    const debouncedValue = useDebounce(searchItem, 500);

    const handleSearch = (e) => {
        const searchValue = e.target.value;
        setLoading(true);

        if (searchValue.startsWith(' ') /* !searchValue.trim() và không có giá trị */) {
            return;
        }

        setSearchItem(searchValue);
    };

    const handleClear = () => {
        setSearchItem('');
        inputRef.current.focus();
    };

    const handleShowResult = () => {
        setShowResult(true);
    };

    const handleHiddenResult = () => {
        setShowResult(false);
    };

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        if (debouncedValue.trim() === '') {
            setLoading(false);
            setSearchResults([]);
            return;
        }

        const getResult = async () => {
            const response = await requests.get(
                SEARCH_URL,
                { params: { search: debouncedValue } },
                {
                    signal: controller.signal,
                },
            );
            if (response.data.includes(debouncedValue)) {
                return;
            }
            isMounted && setSearchResults(response.data);
            setLoading(false);
        };

        getResult();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [debouncedValue]);

    const handleSearchItem = (value) => {
        setSearchItem(value);
        setSearchResults([]);
        if (location.pathname !== '/findTutor') {
            navigate('/findTutor');
        }
    };

    return (
        <HeadlessTippy
            interactive
            appendTo={() => document.body}
            visible={showResult && searchResults.length > 0}
            offset={[0, 1]}
            placement="bottom"
            onClickOutside={handleHiddenResult}
            render={(attrs) => (
                <div className={cx('search_results')} style={{ width: width }} tabIndex="-1" {...attrs}>
                    <Popper>
                        <ul className={cx('search_list')}>
                            {searchResults?.map((searchResult, index) => (
                                <li
                                    key={index}
                                    onClick={() => {
                                        handleSearchItem(searchResult);
                                    }}
                                >
                                    {searchResult}
                                </li>
                            ))}
                        </ul>
                    </Popper>
                </div>
            )}
        >
            <div className={cx('SearchPanel_left-search', { className })}>
                <input
                    ref={inputRef}
                    value={searchItem}
                    type="text"
                    className={cx('SearchPanel_left-search-ip', { className })}
                    placeholder="What would you like to learn?"
                    onChange={handleSearch}
                    onFocus={handleShowResult}
                ></input>
                {!!searchItem && !loading && (
                    <div className={cx('SearchPanel_left-search-icc')} onClick={handleClear}>
                        <ClearIcon />
                    </div>
                )}
                {loading && (
                    <div className={cx('SearchPanel_left-search-icl')}>
                        <LoadingIcon />
                    </div>
                )}
            </div>
        </HeadlessTippy>
    );
}

export default Search;
