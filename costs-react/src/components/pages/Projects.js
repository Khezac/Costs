import Container from '../layout/Container'
import Message from '../layout/Message'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../project/ProjectCard'

import {useLocation} from 'react-router-dom'
import {useState,useEffect} from 'react'

import styles from './Projects.module.css'

function Projects(){
    const [projects,setProjects] = useState([])

    useEffect(()=> {
        fetch('http://localhost:5000/projects', {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((resp)=> resp.json())
        .then((data)=> {
            console.log(data)
            setProjects(data)
        })
        .catch((err)=>console.log(err))
    }, [])

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto"  />
            </div>
            {message && <Message type='success' msg={message} />}
            <Container customClass='start'>
                {projects.length > 0 &&
                    projects.map((project) => <ProjectCard 
                    name={project.name}
                    id={project.id}
                    budget={project.budget}
                    category={project.category.name}
                    key={project.id}
                    // handleRemove=
                    />)}
            </Container>
        </div>
    )
}

export default Projects