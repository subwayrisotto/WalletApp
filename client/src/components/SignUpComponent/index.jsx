import React, { useState } from "react";
import styles from "./signup.module.scss";
import axios from "axios";
import { useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
    firstName: yup.string().required("First name is required field!"),
    email: yup.string().required("Email is required field!").email("Email is not valid!"),
    password: yup.string().required().min(6, "Password must be at least 6 characters!").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "Minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
    passwordConfirmation: yup.string().required().oneOf([yup.ref("password")], "Password must be match!"),
})

export const SignUp = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirmation, setPasswordConfirmation] = useState();
    const [firstName, setFirstName] = useState();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { handleSubmit, register, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    });

    const formSubmit = (data) => {
        console.log(data)
        axios.post("http://localhost:4000/users/signup", data)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    }

    return(
        <>
            <h1 className={styles.error}>Signup</h1>
            <form action="POST" onSubmit={handleSubmit(formSubmit)} className={styles.signupForm}>
                <label htmlFor="email">
                    <span>Email</span>
                    <input 
                        id="email" 
                        value={email} onChange={(e) => setEmail(e.target.value)} 
                        {...register("email")}
                    />
                    {errors.email?.message && <span className={styles.errorMessage}>{errors.email?.message}</span>}
                </label>
                <label htmlFor="password">
                    <span>Password</span>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        {...register("password")}
                    />
                    {errors.password?.message && <span className={styles.errorMessage}>{errors.password?.message}</span>}
                </label>
                <label htmlFor="passwordConfirmation">
                    <span>passwordConfirmation</span>
                    <input 
                        type="password" 
                        id="passwordConfirmation" 
                        value={passwordConfirmation} 
                        onChange={(e) => setPasswordConfirmation(e.target.value)} 
                        {...register("passwordConfirmation")}
                    />
                    {errors.passwordConfirmation?.message && <span className={styles.errorMessage}>{errors.passwordConfirmation?.message}</span>}
                </label>
                <label htmlFor="firstName">
                    <span>firstName</span>
                    <input 
                        type="text" 
                        id="firstName" 
                        value={firstName} onChange={(e) => setFirstName(e.target.value)}
                        {...register("firstName")}  
                    />
                </label>
                {errors.firstName?.message && <span className={styles.errorMessage}>{errors.firstName?.message}</span>}
                <button type="submit">Submit</button>
            </form>

            {isSubmitted && <p className={styles.successfully}>User registered successfully!</p>}
        </>
    )
}