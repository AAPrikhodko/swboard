import React from "react";
import logo from '../../img/logo.png'
import styles from './Header.module.scss'
import textData from '../../languages/en.json'

const Header = () => {
    return (
        <div className={styles.header_wrapper}>
            <a className={styles.header_logo} href="/">
                <img src={logo} width="220" height="30" alt=""/>
            </a>
            <div className={styles.header_title}>
                {textData.header.title}
            </div>
        </div>
    )
}

export default Header