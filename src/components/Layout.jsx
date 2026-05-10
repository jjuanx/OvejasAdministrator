import Navbar from './Navbar'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="pt-14 pb-20 px-4 max-w-lg mx-auto">
        {children}
      </main>
    </div>
  )
}
