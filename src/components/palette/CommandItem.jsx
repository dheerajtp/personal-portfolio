export default function CommandItem({ id, command, active, onRun }) {
  return (
    <li id={id} role="option" aria-selected={active} className={active ? 'on' : undefined} onClick={() => onRun(command)}>
      {command.label}
      <small>{command.hint}</small>
    </li>
  )
}
