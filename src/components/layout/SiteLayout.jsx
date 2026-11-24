import ThemeToggle from '../common/ThemeToggle.jsx'

export default function SiteLayout({ side, children }) {
  return (
    <>
      <ThemeToggle />
      <div className="site">
        {side}
        <main className="main">{children}</main>
      </div>
    </>
  )
}
