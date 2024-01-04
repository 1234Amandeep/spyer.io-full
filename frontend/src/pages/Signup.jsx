import React, { useContext, useState } from "react";
import "../auth.css";
import favListContext from "../context/favListContext";
import { Navigate, useNavigate } from "react-router";
import userContext from "../context/userContext";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState(null);

  const { user, setUser } = useContext(userContext);

  const navigate = useNavigate();

  const { favList } = useContext(favListContext);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // resetting errors
    setErrors(null);
    setIsError(false);

    console.log("email: ", email);
    console.log("password: ", password);
    console.log(favList);

    // sending user cred. to server
    const res = await fetch("http://localhost:4000/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, favList }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data._id) {
      setEmail("");
      setPassword("");

      // setting user context
      setUser({ _id: data._id, email: data.email });

      // navigating to home
      navigate("/");
    } else {
      // setting errors
      setIsError(true);
      setErrors(data);
    }
    console.log(data);
  };

  return (
    <article className="auth-form-container d-flex justify-content-center align-items-center">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="auth-form"
        action="/signup"
      >
        <h2>Sign up</h2>
        <label className="auth-label" htmlFor="email">
          Email
        </label>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="auth-input"
          type="text"
          name="email"
          // required
        />
        {isError && (
          <div className="email error text-danger">{errors.email}</div>
        )}
        <label className="auth-label" htmlFor="password">
          Password
        </label>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="auth-input"
          type="password"
          name="password"
          // required
        />
        {isError && (
          <div className="password error text-danger">{errors.password}</div>
        )}
        <button className="auth-btn">Sign up</button>
      </form>
    </article>
  );
}
