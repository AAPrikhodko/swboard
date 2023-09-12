import React  from "react";
import styles from "./NotFoundPage.module.scss"
import textData from "../../languages/en.json";

const NotFoundPage = () => {
    return (
        <>
            <div className={styles.not_found_title}>{textData.notFound.title}</div>
            <div className={styles.not_found_text}>{textData.notFound.text}</div>
        </>
    )
}

export default NotFoundPage