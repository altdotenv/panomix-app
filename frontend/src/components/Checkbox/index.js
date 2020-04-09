import React from "react"
import styles from "./styles.module.scss"


const Checkbox = props => (
    <input type="checkbox" className={styles.greenCheckbox} {...props} />
)

export default Checkbox;