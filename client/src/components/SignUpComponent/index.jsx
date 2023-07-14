import React, { useState } from "react";
import styles from "./signup.module.scss";
import axios from "axios"

export const SignUp = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [firstName, setFirstName] = useState();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handeSubmit = (e) => {
        e.preventDefault();
        const newUser = {email, password, firstName}
        setIsSubmitted(true)

        axios.post("http://localhost:4000/users/signup", newUser)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    } 

    return(
        <>
            <h1 className={styles.test}>Signup</h1>
            <form action="POST" onSubmit={handeSubmit} className={styles.signupForm}>
                <label htmlFor="email">
                    <span>Email</span>
                    <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label htmlFor="password">
                    <span>Password</span>
                    <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <label htmlFor="passwordConfirmation">
                    <span>passwordConfirmation</span>
                    <input type="password" id="passwordConfirmation"/>
                </label>
                <label htmlFor="firstName">
                    <span>firstName</span>
                    <input type="text" id="firstName" required value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </label>
                <button type="submit">Submit</button>
            </form>

            {isSubmitted && <div>
                <p>{email}</p>
                <p>{password}</p>
                <p>{firstName}</p>    
            </div>}
        </>
    )
}