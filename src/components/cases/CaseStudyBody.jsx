export default function CaseStudyBody({ study, id }) {
  return (
    <div className="csb" id={id}>
      {study.context && (
        <div className="w">
          <b>Context</b>
          {study.context}
        </div>
      )}
      {study.role && (
        <div>
          <b>My role</b>
          {study.role}
        </div>
      )}
      {study.stack && (
        <div>
          <b>Stack</b>
          {study.stack}
        </div>
      )}
      {study.did?.length > 0 && (
        <div className="w">
          <b>What I did</b>
          <ul>
            {study.did.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      )}
      {study.challenges?.length > 0 && (
        <div className="w">
          <b>Challenges</b>
          <ul>
            {study.challenges.map((c) => (
              <li key={c.title}>
                <strong>{c.title}.</strong> {c.text}
              </li>
            ))}
          </ul>
        </div>
      )}
      {study.outcome && (
        <div className="w">
          <b>Outcome</b>
          {study.outcome}
        </div>
      )}
    </div>
  )
}
