import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/pages/Home.js'
import Contacts from './components/pages/Contacts.js'
import NewProject from './components/pages/NewProject.js'
import Company from './components/pages/Company.js'
import Projects from './components/pages/Projects.js'
import Project from './components/pages/Project.js'

import Container from './components/layout/Container'
import Navbar from './components/layout/Navbar.js'
import Footer from './components/layout/Footer.js'

function App() {
  return (
    <Router>
      <Navbar/>
      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/contacts" element={<Contacts/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/company" element={<Company/>}/>
          <Route path="/newproject" element={<NewProject/>}/>
          <Route path="/project/:id" element={<Project/>}/>
        </Routes>
      </Container>
      <Footer/>
    </Router>
  )
}

export default App;
