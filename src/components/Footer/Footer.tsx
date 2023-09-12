import React from "react";
import styles from "./Footer.module.scss"
import textData from '../../languages/en.json'

const Footer = () => {
    return (
        <div className={styles.footer_wrapper}>
            <hr />
            <div >
                &copy;{new Date().getFullYear()} {textData.footer.reservedText}
            </div>
        </div>
    )
}

export default Footer