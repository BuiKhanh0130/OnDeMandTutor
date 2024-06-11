import { Fragment, useState } from "react";
import styles from './ScrollToTop.module.scss'
import classNames from "classnames/bind";
import Button from "~/components/Button";

const cx = classNames.bind(styles)
function ScrollToTop(){
    const [status, setState] = useState(false);
    // const [width, setWidth] = useState(window.innerWidth);

    useState(() =>{
        const GoToTop = () => {
            setState(window.scrollY >= 200)
            
            }
        window.addEventListener('scroll', GoToTop)
        
        return () => {
        window.removeEventListener('scroll', GoToTop)
        }
    }, [])

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior:'smooth'
        })
    }

    return (
        <Fragment>
            {
                status && <button className={cx("GoToTop")} onClick={handleClick}>Go to top</button>
            }
        </Fragment>
        
    )
}

export default ScrollToTop;