import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Post from '~/components/Post';
import useRequestsPrivate from '~/hooks/useRequestPrivate';

import styles from './MyApplyPost.module.scss';

const cx = classNames.bind(styles);

const VIEW_APPLY_FORM_URL = 'FormFindTutor/tutor/viewApplyForm';

function MyApplyPost() {
    const requestPrivate = useRequestsPrivate();
    const [isApprove, setIsApprove] = useState(false);
    const [listResult, setListResult] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        let url = VIEW_APPLY_FORM_URL;
        if (isApprove !== undefined) {
            const params = new URLSearchParams();
            params.append('isApprove', isApprove);
            url += `?${params.toString()}`;
        }
        const viewApplyForm = async () => {
            try {
                const response = await requestPrivate.get(url, { signal: controller.signal });
                console.log(response.data.listResult);
                setListResult(response.data.listResult);
            } catch (error) {}
        };

        viewApplyForm();

        return () => {
            controller.abort();
        };
    }, []);

    const handleForm = (value) => {
        console.log(value);
        if (value === 'Approve') {
            setIsApprove(true);
        } else {
            setIsApprove(false);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Post handleForm={handleForm} syntax={'applyForm'} listClasses={listResult}></Post>
        </div>
    );
}

export default MyApplyPost;
