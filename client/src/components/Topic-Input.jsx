import { useState } from "react";

export default function TopicInput({ topic, setTopic, onGenerate }) {
  return (
    <div className="input-section">
      <input
        type="text"
        placeholder="Enter topic (e.g. Mitochondria)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <button onClick={onGenerate}>Generate</button>
    </div>
  );
}