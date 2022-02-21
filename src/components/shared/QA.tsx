export default function QA({ q, a }: { q: string; a: string | JSX.Element }) {
  return (
    <div key={q}>
      <h4>{q}</h4>
      <p>{a}</p>
    </div>
  )
}
