import { useState } from "react";

export default function Authenticate({token}) {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null)
  const [userWelcome, setUserWelcome] = useState(null)

  async function handleClick() {
    try {
      const response = await fetch(
        `https://fsa-jwt-practice.herokuapp.com/authenticate`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setSuccessMessage(result.message)
      setUserWelcome(result.data.username)
      console.log(result)
    } catch (error) {
      setError(error.message);

    }
  }

  return (
    <>
      <h2>Authenticate</h2>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
      <button onClick={handleClick}>
        "Authenticate Token" or something similar
      </button>
      <h2>Welcome to the party, {userWelcome}</h2>
      
    </>
  );
}
