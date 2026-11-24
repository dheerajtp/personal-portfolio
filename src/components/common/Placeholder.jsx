export default function Placeholder({ children }) {
  return import.meta.env.DEV ? <span className="ph">{children}</span> : null
}
