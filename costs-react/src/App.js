import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from './components/pages/Home.js'
import Contacts from './components/pages/Contacts.js'
import NewProject from './components/pages/NewProject.js'
import Company from './components/pages/Company.js'
import Projects from './components/pages/Projects.js'

import Container from './components/layout/Container'
import Navbar from './components/layout/Navbar.js'
import Footer from './components/layout/Footer.js'

function App() {
  return (
    <Router>
      <Navbar/>
      <Container customClass="min-height">
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/contacts" element={<Contacts/>}/>
          <Route exact path="/projects" element={<Projects/>}/>
          <Route exact path="/company" element={<Company/>}/>
          <Route exact path="/newproject" element={<NewProject/>}/>
        </Routes>
      </Container>
      <Footer/>
    </Router>
  )
}

export default App;
