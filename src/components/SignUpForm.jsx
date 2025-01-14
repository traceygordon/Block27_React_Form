import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (formData.username.length < 8) {
      setNameError(
        "Hold on, pal. Usernames must be 8 characters minimum, capiche?"
      );
      console.log("no, no");
    } else if (formData.password.length < 8) {
      setPasswordError(
        "How's about you talk to my little friend, 8 characters or more?"
      );
      console.log("nice try");
    } else
      try {
        const response = await fetch(
          `https://fsa-jwt-practice.herokuapp.com/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: formData.username,
              password: formData.password,
            }),
          }
        );

        const result = await response.json();
        console.log(result);
        setToken(result.token);
      } catch (error) {
        setError(error.message);
      }
  }

  return (
    <>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit} className="form">
        <label>
          Username:
          <input
            type="text"
            value={formData.username}
            onChange={(e) => {
              setNameError("");
              setFormData((prev) => ({ ...prev, username: e.target.value }));
            }}
          />
          {nameError && <p>{nameError}</p>}
        </label>
        <label>
          Password:
          <input
            type="password"
            value={formData.password}
            onChange={(e) => {
              setPasswordError("");
              setFormData((prev) => ({ ...prev, password: e.target.value }));
            }}
          />
          {passwordError && <p>{passwordError}</p>}
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
