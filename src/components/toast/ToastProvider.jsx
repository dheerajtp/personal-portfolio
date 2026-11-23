import { useCallback, useEffect, useRef, useState } from 'react'
import { ToastContext } from './ToastContext.js'
import './toast.css'

export default function ToastProvider({ children }) {
  const [message, setMessage] = useState('')
  const timer = useRef(null)

  const toast = useCallback((text) => {
    clearTimeout(timer.current)
    setMessage(text)
    timer.current = setTimeout(() => setMessage(''), 1600)
  }, [])

  useEffect(() => () => clearTimeout(timer.current), [])

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className={message ? 'toast show' : 'toast'} role="status">
        {message}
      </div>
    </ToastContext.Provider>
  )
}
