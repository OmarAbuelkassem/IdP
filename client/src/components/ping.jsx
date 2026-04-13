import { useState } from "react";
import api from "../api/axios.js";

const PingButton = () => {
  const [serverResponse, setServerResponse] = useState("");

  const handlePing = async () => {
    try {
      // 1. Send the GET request
      const response = await api.get("/ping");

      // 2. Save the message from the server into our state
      setServerResponse(response.data.message);
    } catch (err) {
      setServerResponse("Error: Could not reach server", err);
    }
  };

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ccc", marginTop: "10px" }}
    >
      <h3>Connection Tester</h3>
      <button onClick={handlePing}>Check Server Connection</button>

      {/* If we have a response, show it here */}
      {serverResponse && (
        <p>
          Response: <strong>{serverResponse}</strong>
        </p>
      )}
    </div>
  );
};

export default PingButton;
