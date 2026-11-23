import ToastProvider from './components/toast/ToastProvider.jsx'
import PageShell from './components/palette/PageShell.jsx'

export default function App() {
  return (
    <ToastProvider>
      <PageShell />
    </ToastProvider>
  )
}
