import { useNavigate } from 'react-router-dom'

import ProjectForm from '../project/ProjectForm';

import styles from './NewProject.module.css'

function NewProject (){

    const navigate = useNavigate()

    function createPost(project) {
        // Initialize cost and services
        project.cost = 0;
        project.services = []

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(project),
        })  
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            const state = { message: "Projeto criado com sucesso!" };
            navigate("/projects", {state});
        })
        .catch((err) => console.log(err))
    }
    
    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar o serviço</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
        </div>
    )
}

export default NewProject; 