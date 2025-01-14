import { useState } from "react";

export default function SignUpForm({setToken}) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (formData.username.length < 8) {
setNameError("Hold on, pal. Usernames must be 8 characters minimum, capiche?")
      console.log("no, no")  
    } else if (formData.password.length < 8){

console.log("nice try")
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
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            
}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
