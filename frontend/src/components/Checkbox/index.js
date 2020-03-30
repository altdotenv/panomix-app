import React from "react"
import styles from "./styles.module.scss"
import { Link } from "react-router-dom"


const Checkbox = props => (
    <input type="checkbox" className={styles.greenCheckbox} {...props} />
)

export default Checkbox;