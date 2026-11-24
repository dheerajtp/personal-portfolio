import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import CommandItem from './CommandItem.jsx'
import './palette.css'

export default function CommandPalette({ open, onClose, commands }) {
  const [query, setQuery] = useState('')
  const [idx, setIdx] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const opener = document.activeElement
    inputRef.current?.focus()
    return () => opener?.focus?.()
  }, [open])

  if (!open) return null

  const q = query.toLowerCase()
  const list = commands.filter((c) => c.label.toLowerCase().includes(q))
  const current = Math.min(idx, list.length - 1)

  const close = () => {
    setQuery('')
    setIdx(0)
    onClose()
  }

  const run = (c) => {
    close()
    c?.run()
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIdx(Math.min(current + 1, list.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIdx(Math.max(current - 1, 0))
    } else if (e.key === 'Enter') run(list[current])
    else if (e.key === 'Escape') close()
  }

  return createPortal(
    <div className="pal" onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="box" role="dialog" aria-modal="true" aria-label="Search">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a command or section"
          aria-label="Search commands"
          role="combobox"
          aria-expanded="true"
          aria-controls="pal-list"
          aria-activedescendant={list[current] ? `pal-${list[current].id}` : undefined}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIdx(0)
          }}
          onKeyDown={onKeyDown}
        />
        <ul id="pal-list" role="listbox">
          {list.length ? (
            list.map((c, i) => <CommandItem key={c.id} id={`pal-${c.id}`} command={c} active={i === current} onRun={run} />)
          ) : (
            <li>No match</li>
          )}
        </ul>
      </div>
    </div>,
    document.body,
  )
}
