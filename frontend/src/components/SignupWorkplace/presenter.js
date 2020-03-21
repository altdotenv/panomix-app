import React from "react"
import styles from "./styles.module.scss"

const SignupWorkplace = props => (
    
    <form onSubmit={props.handleSubmit} >
        <input
            type="text"
            className={styles.loginInput}
            placeholder="Full Name"
            onFocus={(e) => e.target.placeholder = ""} 
            onBlur={(e) => e.target.placeholder = "Full Name"}
            name="name"
            value={props.name}
            onChange={props.handleChange}
            required
        />
        <input
            type="text"
            className={styles.loginInput}
            placeholder="example@example.com"
            name="email"
            value={props.email}
            onFocus={(e) => e.target.placeholder = ""} 
            onBlur={(e) => e.target.placeholder = "example@example.com"}
            onChange={props.handleChange}
            pattern="^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$"
            required
        />
        {props.email_exist ? <p>email exist</p> : null}
        <input
            type="password"
            className={styles.loginInput}
            placeholder="Password"
            name="password"
            value={props.password}
            onFocus={(e) => e.target.placeholder = ""} 
            onBlur={(e) => e.target.placeholder = "Password"}
            onChange={props.handleChange}
            required
        />
        <input
            type="text"
            className={styles.loginInput}
            placeholder="Workplace"
            name="workplace"
            value={props.workplace}
            onFocus={(e) => e.target.placeholder = ""} 
            onBlur={(e) => e.target.placeholder = "Workplace"}
            onChange={props.handleChange}
            required
        />
        {props.is_workplace_exist ? <p>workplace name already exist</p> : null }
        <input
            type="text"
            className={styles.loginInput}
            name="workplace"
            value={props.workplace}
            onChange={props.handleChange}
            required
        />
        <button type="submit" className={styles.signInButton}>Continue</button>
    </form>
)

export default SignupWorkplace