import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Post from '~/components/Post';
import useRequestsPrivate from '~/hooks/useRequestPrivate';

import styles from './MyApplyPost.module.scss';

const cx = classNames.bind(styles);

const VIEW_APPLY_FORM_URL = 'formfindtutor/tutor_getforms';

function MyApplyPost() {
    const requestPrivate = useRequestsPrivate();
    const [isApprove, setIsApprove] = useState(null);
    const [listResult, setListResult] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const viewApplyForm = async () => {
            try {
                const response = await requestPrivate.get(
                    VIEW_APPLY_FORM_URL,
                    { params: { isApprove } },
                    { signal: controller.signal },
                );
                isMounted && setListResult(response.data.listResult);
            } catch (error) {}
        };

        viewApplyForm();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [isApprove]);

    const handleForm = (value) => {
        console.log(value);
        if (value === 'Approve') {
            setIsApprove(false);
        } else if (value === 'Not Approve') {
            setIsApprove(true);
        } else {
            setIsApprove();
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Post handleForm={handleForm} syntax={'applyForm'} listClasses={listResult} isApprove={isApprove}></Post>
        </div>
    );
}

export default MyApplyPost;
