export default function StyleSelector({ style, setStyle }) {
  return (
    <select value={style} onChange={(e) => setStyle(e.target.value)}>
      <option>Elon Musk</option>
      <option>Professor</option>
      <option>Storytelling</option>
      <option>Child Friendly</option>
      <option>Exam Crash Course</option>
    </select>
  );
}