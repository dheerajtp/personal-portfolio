import SkillGroup from './SkillGroup.jsx'

export default function SkillGroups({ groups }) {
  return (
    <div className="sk">
      {groups.map((g) => (
        <SkillGroup key={g.group} {...g} />
      ))}
    </div>
  )
}
