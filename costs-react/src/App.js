import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from './components/pages/Home.js'
import Contacts from './components/pages/Contacts.js'
import NewProject from './components/pages/NewProject.js'
import Company from './components/pages/Company.js'

import Container from './components/layout/Container'

function App() {
  return (
    <Router>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/contacts">Contatos</Link>
        <Link to="/company">Empresa</Link>
        <Link to="/newproject">Novo Projeto</Link>
      </ul>
      <Container customClass="min-height">
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/contacts" element={<Contacts/>}/>
          <Route exact path="/company" element={<Company/>}/>
          <Route exact path="/newproject" element={<NewProject/>}/>
        </Routes>
      </Container>
      <p>Footer</p>
    </Router>
  )
}

export default App;
