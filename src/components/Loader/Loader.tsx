import React from "react";
import styles from "./Loader.module.scss"
import textData from '../../languages/en.json'

const Loader = () => {
    return (
        <div className={styles.loader_text}>
            {textData.loader.text}
        </div>
    )
}

export default Loader