import Footer from './components/Footer'
import Header from './components/Header'
import { siteContent } from './data/siteContent'
import Home from './pages/Home'

function App() {
  return (
    <>
      <Header
        companyName={siteContent.companyName}
        brandShort={siteContent.brandShort}
        brandMark={siteContent.brandMark}
        nav={siteContent.nav}
      />
      <Home content={siteContent} />
      <Footer
        companyName={siteContent.companyName}
        email={siteContent.email}
        note={siteContent.footer.note}
      />
    </>
  )
}

export default App
