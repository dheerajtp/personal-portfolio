import ChipList from '../common/ChipList.jsx'

export default function SkillGroup({ group, items }) {
  return (
    <div>
      <b>{group}</b>
      <ChipList items={items} />
    </div>
  )
}
