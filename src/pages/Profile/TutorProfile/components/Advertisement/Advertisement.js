import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { storage } from '~/firebase/firebase';
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { v4 } from 'uuid';
import Modal from 'react-bootstrap/Modal';

import { CloseIcon } from '~/components/Icons';
import Button from '~/components/Button';
import { ImageConfig } from '../ImageConfig/ImageConfig';
import uploadImg from '~/assets/images/cloud-upload-regular-240.png';
import useRequestsPrivate from '~/hooks/useRequestPrivate';

import styles from './Advertisement.module.scss';

const cx = classNames.bind(styles);
const GENERATED_ADS_URL = 'tutor-ad/create_ads';

function Advertisement({ onHide, setAdvertisement }) {
    const requestPrivate = useRequestsPrivate();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingImage, setLoadingImage] = useState(false);
    const [imageUrl, setNameImage] = useState(null);
    const [imageUpload, setImageUpload] = useState(null);
    const [videoUrl, setNameVideo] = useState(null);
    const wrapperRef = useRef(null);
    const [fileList, setFileList] = useState([]);
    const [tittle, setTittle] = useState('');
    const onDragEnter = () => wrapperRef.current.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
    const onDrop = () => wrapperRef.current.classList.remove('dragover');
    //up image
    const handleChangeImage = async () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        setLoadingImage(true);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((snapshot) => {
                setNameImage(snapshot);
                setLoadingImage(false);
            });
        });
    };

    //video
    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
        }
    };

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
    };

    const handleUploadVideo = () => {
        if (fileList[0] === null) return;
        const fileRef = ref(storage, `videos/${fileList[0].name}`);
        const uploadTask = uploadBytesResumable(fileRef, fileList[0]);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                setLoading(true);
                let progress = (snapshot.bytesTransferred / snapshot.bytesTransferred) * 100;
                console.log(progress);
            },
            (error) => {
                console.log(error);
            },
            () => {
                console.log('success');
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log(downloadURL);
                    setNameVideo(downloadURL);
                    setLoading(false);
                });
            },
        );
    };

    //handle tittle
    const handleTittle = (e) => {
        const value = e.target.value;
        if (value.startsWith(' ')) return;
        setTittle(value);
    };

    //handle create ad
    const handleCreateAds = async () => {
        try {
            const response = await requestPrivate.post(
                GENERATED_ADS_URL,
                JSON.stringify({
                    title: tittle,
                    imageUrl,
                    videoUrl,
                }),
            );

            console.log(response.status);
            if (response.status === 200) {
                setShowModal(true);

                setTimeout(() => {
                    setShowModal(false);
                    setAdvertisement(false);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('modal')}>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('title')}>Advertisement</div>
                    <div className={cx('body')}>
                        <div className={cx('body__header')}>
                            <label id="tittle">Tittle</label>
                            <input type="text" id="tittle" value={tittle} onChange={handleTittle}></input>
                        </div>
                        <div className={cx('body__img')}>
                            <label id="imageUrl">Image Video</label>
                            <input
                                type="file"
                                id="imageUrl"
                                onChange={(event) => {
                                    setImageUpload(event.target.files[0]);
                                }}
                            ></input>
                            {loadingImage ? (
                                <h3>Loading...</h3>
                            ) : (
                                <>
                                    <Button
                                        orange
                                        onClick={handleChangeImage}
                                        style={imageUrl ? { display: 'none' } : { display: 'block' }}
                                    >
                                        Confirm
                                    </Button>
                                    <Button
                                        orange
                                        onClick={handleChangeImage}
                                        style={
                                            imageUrl
                                                ? { display: 'block', backgroundColor: 'red' }
                                                : { display: 'none' }
                                        }
                                    >
                                        Success
                                    </Button>
                                </>
                            )}
                        </div>
                        <div className={cx('body__video')}>
                            <h3>Video</h3>
                            <div
                                ref={wrapperRef}
                                className={cx('drop-file-input')}
                                onDragEnter={onDragEnter}
                                onDragLeave={onDragLeave}
                                onDrop={onDrop}
                            >
                                <div className={cx('drop-file-input__label')}>
                                    <img src={uploadImg} alt="" />
                                    <p>Drag & Drop your video here</p>
                                </div>
                                <input type="file" onChange={onFileDrop} />
                            </div>
                            {fileList.length > 0 ? (
                                <div className="drop-file-preview">
                                    <p
                                        className="drop-file-preview__title"
                                        style={videoUrl ? { display: 'none' } : { display: 'block' }}
                                    >
                                        Ready to upload
                                    </p>
                                    {fileList.map((item, index) => (
                                        <div key={index} className={cx('drop-file-preview__item')}>
                                            <img
                                                src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']}
                                                alt=""
                                            />
                                            <div className={cx('drop-file-preview__item__info')}>
                                                <p>{item.name}</p>
                                                <p>{item.size}B</p>
                                            </div>
                                            <span
                                                className={cx('drop-file-preview__item__del')}
                                                onClick={() => fileRemove(item)}
                                            >
                                                x
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                            {loading ? (
                                <h4>Loading...</h4>
                            ) : (
                                <>
                                    {' '}
                                    <Button
                                        orange
                                        onClick={handleUploadVideo}
                                        style={videoUrl ? { display: 'none' } : { display: 'block' }}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        orange
                                        onClick={handleUploadVideo}
                                        style={
                                            videoUrl
                                                ? { display: 'block', backgroundColor: 'red' }
                                                : { display: 'none' }
                                        }
                                    >
                                        Success
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                    <Button transparent onClick={handleCreateAds} className={cx('create__ads')}>
                        Create Advertisement
                    </Button>
                    <div onClick={onHide}>
                        <CloseIcon className={cx('close-icon')} />
                    </div>
                    <Modal show={showModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Success</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Your request has been sent successfully!</Modal.Body>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Advertisement;
