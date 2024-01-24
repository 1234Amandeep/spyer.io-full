import React, { useContext, useState } from "react";
import "../auth.css";
import { useNavigate } from "react-router";
import favListContext from "../context/favListContext";
import userContext from "../context/userContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const { setFavList } = useContext(favListContext);
  const { setUser } = useContext(userContext);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // resetting errors to null
    setErrors(null);
    setIsError(false);

    try {
      // sending user cred. to server
      const res = await fetch("https://spyer-io-api.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data._id) {
        // user logged in
        console.log(data);

        setFavList(data.favList);
        setUser({ _id: data._id, email: data.email });

        setEmail("");
        setPassword("");

        navigate("/");
      } else {
        // user not logged in might be some error
        setIsError(true);
        setErrors(data);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className="auth-form-container d-flex justify-content-center align-items-center">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="auth-form"
        action="/signup"
      >
        <h2>Log in</h2>
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
          required
        />
        {isError && <div className="email error">{errors.email}</div>}
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
          required
        />
        {isError && <div className="password error">{errors.password}</div>}
        <button className="auth-btn">Log in</button>
      </form>
    </article>
  );
}
