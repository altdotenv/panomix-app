import React from "react"
import styles from "./styles.module.scss"

const Settings = props => (
    <div className={styles.settings}>
        <div className={styles.leftDiv}></div>
        <div className={styles.rightDiv}>
            <div className={styles.container}>
                {props.userList ? 
                    props.userList.map((obj) => (
                        <div className={styles.userRow}>{obj.name}</div>
                    ))
                :
                null
                }
            </div>    
        </div>
        
    </div>
)

export default Settings