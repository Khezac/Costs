import { parse, v4 as uuidv4 } from 'uuid'
import styles from './Project.module.css'
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'
import Message from '../layout/Message'
 
function Project(){

    const { id } = useParams()

    const [showServiceForm,setShowServiceForm] = useState(false)
    const [showProjectForm,setShowProjectForm] = useState(false)
    const [project,setProject] = useState([])
    const [services,setServices] = useState([])
    const [message,setMessage] = useState('')
    const [type,setType] = useState()

    useEffect(() => {
        setTimeout(()=> {fetch(`http://localhost:5000/projects/${id}`, {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((resp) => resp.json())
        .then((data)=>{
            setProject(data)
            setServices(data.services)
        })
        .catch((err)=> console.log(err))},300)
    },[id])

    function editPost(project){
        setMessage('')

        if(project.budget < project.cost){
            setMessage('O orçamento não pode ser menor do que o custo do Projeto')
            setType("error")
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project)
        }).then((resp)=> resp.json())
        .then((data)=>{
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto atualizado!')
            setType("success")
        })
        .catch((err)=>console.log(err))
    }

    function createService(){
        setMessage('')
        //Get the project value
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        //Start a parameter for validation
        const newCost = parseFloat(project.cost) + parseFloat(lastService.cost)

        //Validation
        if(newCost > parseFloat(project.budget)){
            setMessage('Orçamento ultrapassado! Verifique o valor do serviço.')
            setType('error')
            project.services.pop()
            return false
        } 
        
        //adding service cost to the project cost
        project.cost= newCost

        //update project cost
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method:'PATCH',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(project)
        }).then((resp) => resp.json())
        .then((data)=>{
            setShowServiceForm(false)
        })
        .catch((err)=> console.log(err))
    }

    function removeService(){}

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    return(
        <>
            {project.name ? 
            <div className={styles.project_details}>
                <Container customClass='column'>
                    {message && <Message type={type} msg={message}/>}
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                        </button>
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p>
                                    <span>Categoria:</span> {project.category.name}
                                </p>
                                <p>
                                    <span>Orçamento total:</span> R${project.budget}
                                </p>
                                <p>
                                    <span>Total utilizado:</span> R${project.cost}
                                </p>
                            </div>    
                        ) : (
                            <div className={styles.project_info}>
                                <ProjectForm handleSubmit={editPost} btnText='Concluir Edição' projectData={project}/>
                            </div>    
                        )}
                    </div>
                    <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && <ServiceForm
                                    handleSubmit={createService}
                                    btnText='Adicionar Serviço'
                                    projectData={project}
                                />}
                            </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass='start'>
                        {services.length > 0 &&
                            services.map((services) => (
                                <ServiceCard 
                                    id={services.id}
                                    name={services.name}
                                    cost={services.cost}
                                    description={services.description}
                                    key={services.key}
                                    handleRemove={removeService}
                                />
                            ))
                        }
                        {services.length === 0 && <p>Não há serviços cadastrados.</p>}
                    </Container>
                </Container>
            </div>
            : <Loading/>}
        </>
    )
}

export default Project