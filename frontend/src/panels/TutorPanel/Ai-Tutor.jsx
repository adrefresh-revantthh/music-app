// // import { useState } from "react";
// // import axios from "axios";

// // function App() {
// //   const [topic, setTopic] = useState("");
// //   const [style, setStyle] = useState("Elon Musk");
// //   const [script, setScript] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const generateExplanation = async () => {
// //     if (!topic) {
// //       alert("Please enter a topic");
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       setScript("");

// //       const res = await axios.post(
// //         "http://localhost:5000/api/script",
// //         {
// //           topic,
// //           style,
// //         }
// //       );

// //       setScript(res.data.script);
// //     } catch (err) {
// //       console.error(err);
// //       alert("Error generating explanation");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div style={styles.container}>
// //       <h1 style={styles.title}>AI Tutor 🚀</h1>

// //       {/* Style Dropdown */}
// //       <select
// //         value={style}
// //         onChange={(e) => setStyle(e.target.value)}
// //         style={styles.select}
// //       >
// //         <option>Elon Musk</option>
// //         <option>Professor</option>
// //         <option>Story</option>
// //         <option>Exam Crash</option>
// //         <option>Child Friendly</option>
// //       </select>

// //       {/* Topic Input */}
// //       <input
// //         type="text"
// //         placeholder="Enter topic (e.g. Photosynthesis)"
// //         value={topic}
// //         onChange={(e) => setTopic(e.target.value)}
// //         style={styles.input}
// //       />

// //       {/* Generate Button */}
// //       <button onClick={generateExplanation} style={styles.button}>
// //         Generate Explanation
// //       </button>

// //       {/* Loader */}
// //       {loading && <p>Generating AI explanation...</p>}

// //       {/* Result */}
// //       {script && (
// //         <div style={styles.resultBox}>
// //           <h3>AI Explanation</h3>
// //           <p>{script}</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default App;

// // /* 🔥 Inline Styles (Simple & Clean) */
// // const styles = {
// //   container: {
// //     maxWidth: "700px",
// //     margin: "40px auto",
// //     padding: "20px",
// //     fontFamily: "Arial",
// //   },
// //   title: {
// //     textAlign: "center",
// //   },
// //   select: {
// //     width: "100%",
// //     padding: "10px",
// //     marginBottom: "10px",
// //   },
// //   input: {
// //     width: "100%",
// //     padding: "10px",
// //     marginBottom: "10px",
// //   },
// //   button: {
// //     width: "100%",
// //     padding: "12px",
// //     background: "#007bff",
// //     color: "#fff",
// //     border: "none",
// //     cursor: "pointer",
// //     marginBottom: "15px",
// //   },
// //   resultBox: {
// //     background: "#f4f4f4",
// //     padding: "15px",
// //     borderRadius: "8px",
// //   },
// // };
// // import { useState } from "react";
// // import axios from "axios";

// // function App() {
// //   const [topic, setTopic] = useState("");
// //   const [style, setStyle] = useState("Elon Musk");
// //   const [script, setScript] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [speaking, setSpeaking] = useState(false);

// //   /* 🔥 Generate AI explanation */
// //   const generateExplanation = async () => {
// //     if (!topic) {
// //       alert("Please enter a topic");
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       setScript("");

// //       const res = await axios.post(
// //         "http://localhost:5000/api/script",
// //         { topic, style }
// //       );

// //       setScript(res.data.script);
// //     } catch (err) {
// //       console.error(err);
// //       alert("Error generating explanation");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   /* 🔥 Speak text (FREE Indian voice) */
// //   const speakText = () => {
// //     if (!script) return;

// //     const speech = new SpeechSynthesisUtterance(script);

// //     // Indian English voice
// //     speech.lang = "en-IN";

// //     // Elon-style pacing
// //     speech.rate = 0.9;
// //     speech.pitch = 0.95;

// //     window.speechSynthesis.cancel();
// //     window.speechSynthesis.speak(speech);

// //     setSpeaking(true);

// //     speech.onend = () => setSpeaking(false);
// //   };

// //   /* 🔥 Stop speaking */
// //   const stopSpeech = () => {
// //     window.speechSynthesis.cancel();
// //     setSpeaking(false);
// //   };

// //   return (
// //     <div style={styles.container}>
// //       <h1 style={styles.title}>AI Tutor 🚀</h1>

// //       {/* Style Dropdown */}
// //       <select
// //         value={style}
// //         onChange={(e) => setStyle(e.target.value)}
// //         style={styles.select}
// //       >
// //         <option>Elon Musk</option>
// //         <option>Professor</option>
// //         <option>Story</option>
// //         <option>Exam Crash</option>
// //         <option>Child Friendly</option>
// //       </select>

// //       {/* Topic Input */}
// //       <input
// //         type="text"
// //         placeholder="Enter topic (e.g. Photosynthesis)"
// //         value={topic}
// //         onChange={(e) => setTopic(e.target.value)}
// //         style={styles.input}
// //       />

// //       {/* Generate */}
// //       <button onClick={generateExplanation} style={styles.button}>
// //         Generate Explanation
// //       </button>

// //       {/* Loader */}
// //       {loading && <p>Generating AI explanation...</p>}

// //       {/* Result */}
// //       {script && (
// //         <div style={styles.resultBox}>
// //           <h3>AI Explanation</h3>
// //           <p>{script}</p>

// //           {/* 🔥 Voice Buttons */}
// //           <div style={{ marginTop: "10px" }}>
// //             {!speaking ? (
// //               <button onClick={speakText}>🔊 Speak</button>
// //             ) : (
// //               <button onClick={stopSpeech}>⏹ Stop</button>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default App;

// // const styles = {
// //   container: {
// //     maxWidth: "700px",
// //     margin: "40px auto",
// //     padding: "20px",
// //     fontFamily: "Arial",
// //   },
// //   title: {
// //     textAlign: "center",
// //   },
// //   select: {
// //     width: "100%",
// //     padding: "10px",
// //     marginBottom: "10px",
// //   },
// //   input: {
// //     width: "100%",
// //     padding: "10px",
// //     marginBottom: "10px",
// //   },
// //   button: {
// //     width: "100%",
// //     padding: "12px",
// //     background: "#007bff",
// //     color: "#fff",
// //     border: "none",
// //     cursor: "pointer",
// //     marginBottom: "15px",
// //   },
// //   resultBox: {
// //     background: "#f4f4f4",
// //     padding: "15px",
// //     borderRadius: "8px",
// //   },
// // };
// import { useState } from "react";
// import axios from "axios";

// function App() {
//   const [topic, setTopic] = useState("");
//   const [language, setLanguage] = useState("telugu");
//   const [script, setScript] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [speaking, setSpeaking] = useState(false);

//   /* 🔥 Generate Telugu storytelling explanation */
//   const generateExplanation = async () => {
//     if (!topic) {
//       alert("Please enter a topic");
//       return;
//     }

//     try {
//       setLoading(true);
//       setScript("");

//       const res = await axios.post(
//         "http://localhost:5000/api/script",
//         {
//           topic,
//           language,
//         }
//       );

//       setScript(res.data.script);
//     } catch (err) {
//       console.error(err);
//       alert("Error generating explanation");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* 🔥 Storytelling Telugu voice */
//   const speakText = () => {
//     if (!script) return;

//     setSpeaking(true);

//     const lang = language === "telugu" ? "te-IN" : "en-IN";

//     // Split into sentences → natural pauses
//     const sentences = script.split(/\.|\n/);

//     sentences.forEach((line, index) => {
//       if (!line.trim()) return;

//       const speech = new SpeechSynthesisUtterance(line);

//       speech.lang = lang;
//       speech.rate = language === "telugu" ? 0.85 : 0.92;
//       speech.pitch = 1;

//       setTimeout(() => {
//         window.speechSynthesis.speak(speech);
//       }, index * 1600);
//     });

//     setTimeout(() => setSpeaking(false), sentences.length * 1600);
//   };

//   /* 🔥 Stop voice */
//   const stopSpeech = () => {
//     window.speechSynthesis.cancel();
//     setSpeaking(false);
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>AI Telugu Tutor 🚀</h1>

//       {/* Language Switch */}
//       <select
//         value={language}
//         onChange={(e) => setLanguage(e.target.value)}
//         style={styles.select}
//       >
//         <option value="telugu">Telugu</option>
//         <option value="english">English</option>
//       </select>

//       {/* Topic Input */}
//       <input
//         type="text"
//         placeholder="Topic (e.g. Photosynthesis)"
//         value={topic}
//         onChange={(e) => setTopic(e.target.value)}
//         style={styles.input}
//       />

//       {/* Generate */}
//       <button onClick={generateExplanation} style={styles.button}>
//         Generate Explanation
//       </button>

//       {/* Loader */}
//       {loading && <p>Generating explanation...</p>}

//       {/* Result */}
//       {script && (
//         <div style={styles.resultBox}>
//           <h3>AI Explanation</h3>
//           <p>{script}</p>

//           {/* Voice */}
//           <div style={{ marginTop: "10px" }}>
//             {!speaking ? (
//               <button onClick={speakText}>🔊 Listen</button>
//             ) : (
//               <button onClick={stopSpeech}>⏹ Stop</button>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

// const styles = {
//   container: {
//     maxWidth: "700px",
//     margin: "40px auto",
//     padding: "20px",
//     fontFamily: "Arial",
//   },
//   title: {
//     textAlign: "center",
//   },
//   select: {
//     width: "100%",
//     padding: "10px",
//     marginBottom: "10px",
//   },
//   input: {
//     width: "100%",
//     padding: "10px",
//     marginBottom: "10px",
//   },
//   button: {
//     width: "100%",
//     padding: "12px",
//     background: "#007bff",
//     color: "#fff",
//     border: "none",
//     cursor: "pointer",
//     marginBottom: "15px",
//   },
//   resultBox: {
//     background: "#f4f4f4",
//     padding: "15px",
//     borderRadius: "8px",
//   },
// };
// import { useState, useEffect } from "react";
// import axios from "axios";

// function Ai() {
//   const [topic, setTopic] = useState("");
//   const [language, setLanguage] = useState("telugu");
//   const [script, setScript] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [speaking, setSpeaking] = useState(false);
//   const [voices, setVoices] = useState([]);

//   /* 🔥 Load available system voices */
//   useEffect(() => {
//     const loadVoices = () => {
//       const allVoices = speechSynthesis.getVoices();
//       console.log("Available voices:", allVoices);
//       setVoices(allVoices);
//     };

//     loadVoices();

//     speechSynthesis.onvoiceschanged = loadVoices;
//   }, []);

//   /* 🔥 Generate storytelling explanation */
//   const generateExplanation = async () => {
//     if (!topic) {
//       alert("Please enter a topic");
//       return;
//     }

//     try {
//       setLoading(true);
//       setScript("");

//       const res = await axios.post(
//         "http://localhost:5000/api/script",
//         { topic, language }
//       );

//       setScript(res.data.script);
//     } catch (err) {
//       console.error(err);
//       alert("Error generating explanation");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* 🔥 Smart Telugu + English voice */
//   const speakText = () => {
//     if (!script) return;

//     setSpeaking(true);
//     window.speechSynthesis.cancel();

//     // Telugu or English
//     let selectedVoice;

//     if (language === "telugu") {
//       selectedVoice = voices.find((v) =>
//         v.lang.toLowerCase().includes("te")
//       );
//     }

//     // fallback to Indian English
//     if (!selectedVoice) {
//       selectedVoice = voices.find((v) =>
//         v.lang.toLowerCase().includes("en-in")
//       );
//     }

//     // final fallback
//     if (!selectedVoice) {
//       selectedVoice = voices[0];
//     }

//     const sentences = script.split(/\.|\n/);

//     sentences.forEach((line, index) => {
//       if (!line.trim()) return;

//       const speech = new SpeechSynthesisUtterance(line);

//       speech.voice = selectedVoice;
//       speech.rate = language === "telugu" ? 0.85 : 0.92;
//       speech.pitch = 1;

//       setTimeout(() => {
//         window.speechSynthesis.speak(speech);
//       }, index * 1700);
//     });

//     setTimeout(() => setSpeaking(false), sentences.length * 1700);
//   };

//   /* 🔥 Stop speaking */
//   const stopSpeech = () => {
//     window.speechSynthesis.cancel();
//     setSpeaking(false);
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>AI Telugu Tutor 🚀</h1>

//       {/* Language Switch */}
//       <select
//         value={language}
//         onChange={(e) => setLanguage(e.target.value)}
//         style={styles.select}
//       >
//         <option value="telugu">Telugu</option>
//         <option value="english">English</option>
//       </select>

//       {/* Topic */}
//       <input
//         type="text"
//         placeholder="Topic (e.g. Photosynthesis)"
//         value={topic}
//         onChange={(e) => setTopic(e.target.value)}
//         style={styles.input}
//       />

//       {/* Generate */}
//       <button onClick={generateExplanation} style={styles.button}>
//         Generate Explanation
//       </button>

//       {loading && <p>Generating explanation...</p>}

//       {/* Result */}
//       {script && (
//         <div style={styles.resultBox}>
//           <h3>AI Explanation</h3>
//           <p>{script}</p>

//           <div style={{ marginTop: "10px" }}>
//             {!speaking ? (
//               <button onClick={speakText}>🔊 Listen</button>
//             ) : (
//               <button onClick={stopSpeech}>⏹ Stop</button>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Ai;

// const styles = {
//   container: {
//     maxWidth: "700px",
//     margin: "40px auto",
//     padding: "20px",
//     fontFamily: "Arial",
//   },
//   title: { textAlign: "center" },
//   select: {
//     width: "100%",
//     padding: "10px",
//     marginBottom: "10px",
//   },
//   input: {
//     width: "100%",
//     padding: "10px",
//     marginBottom: "10px",
//   },
//   button: {
//     width: "100%",
//     padding: "12px",
//     background: "#007bff",
//     color: "#fff",
//     border: "none",
//     cursor: "pointer",
//     marginBottom: "15px",
//   },
//   resultBox: {
//     background: "#f4f4f4",
//     padding: "15px",
//     borderRadius: "8px",
//   },
// };
import { useState, useEffect } from "react";
import axios from "axios";

function Ai() {
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("english");
  const [speaker, setSpeaker] = useState("ramu");
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);

  /* Load voices */
  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      console.log("Available voices:", allVoices);
      setVoices(allVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  /* Generate explanation */
  const generateExplanation = async () => {
    if (!topic) {
      alert("Please enter a topic");
      return;
    }

    try {
      setLoading(true);
      setScript("");

      const res = await axios.post(
        "http://localhost:5000/api/script",
        { topic, language }
      );

      setScript(res.data.script);
    } catch (err) {
      console.error(err);
      alert("Error generating explanation");
    } finally {
      setLoading(false);
    }
  };

  /* Speak with proper Indian English voice mapping */
  const speakText = () => {
    if (!script) return;

    window.speechSynthesis.cancel();
    setSpeaking(true);

    const allVoices = voices;

    // Step 1: Get Indian English voices
    const indianVoices = allVoices.filter((v) =>
      v.lang.toLowerCase().includes("en-in")
    );

    let selectedVoice = null;

    if (speaker === "ramu") {
      // Try known Indian male voices
      selectedVoice =
        indianVoices.find((v) =>
          v.name.toLowerCase().includes("ravi")
        ) ||
        indianVoices.find((v) =>
          v.name.toLowerCase().includes("male")
        );
    } else {
      // Try known Indian female voices
      selectedVoice =
        indianVoices.find((v) =>
          v.name.toLowerCase().includes("heera")
        ) ||
        indianVoices.find((v) =>
          v.name.toLowerCase().includes("female")
        );
    }

    // Step 2: If no specific match, fallback to first Indian voice
    if (!selectedVoice && indianVoices.length > 0) {
      selectedVoice = indianVoices[0];
    }

    // Step 3: Final fallback to any English voice
    if (!selectedVoice) {
      selectedVoice = allVoices.find((v) =>
        v.lang.toLowerCase().includes("en")
      );
    }

    const utterance = new SpeechSynthesisUtterance(script);
    utterance.voice = selectedVoice;
    utterance.rate = 0.9;
    utterance.pitch = speaker === "rekha" ? 1.1 : 1;

    utterance.onend = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>AI Indian Tutor</h1>

      {/* Language */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={styles.select}
      >
        <option value="english">English</option>
        <option value="telugu">Telugu</option>
      </select>

      {/* Speaker */}
      <select
        value={speaker}
        onChange={(e) => setSpeaker(e.target.value)}
        style={styles.select}
      >
        <option value="ramu">Ramu (Male - Indian English)</option>
        <option value="rekha">Rekha (Female - Indian English)</option>
      </select>

      {/* Topic */}
      <input
        type="text"
        placeholder="Enter topic (e.g. Photosynthesis)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={styles.input}
      />

      <button onClick={generateExplanation} style={styles.button}>
        Generate Explanation
      </button>

      {loading && <p>Generating explanation...</p>}

      {script && (
        <div style={styles.resultBox}>
          <h3>AI Explanation</h3>
          <p>{script}</p>

          <div style={{ marginTop: "10px" }}>
            {!speaking ? (
              <button onClick={speakText}>Listen</button>
            ) : (
              <button onClick={stopSpeech}>Stop</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Ai;

const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "Arial",
  },
  title: { textAlign: "center" },
  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    marginBottom: "15px",
  },
  resultBox: {
    background: "#f4f4f4",
    padding: "15px",
    borderRadius: "8px",
  },
};