import styles from './ProjectForm.module.css'
import Input from '../Form/Input'
import Select from '../Form/Select'
import SubmitButton from '../Form/SubmitButton'

function ProjectForm ({btnText}){
    return (
        <form className={styles.form}>
            <div>
                <Input type="text" text="Nome do projeto" name="name" placeholder="Insira o nome do projeto"/>
            </div>
            <div>
                <Input type="number" text="Orçamento do projeto" name="budget" placeholder="Insira o orçamento total do projeto"/>
            </div>
            <div>
                <Select name="category_id" text="Selecione a categoria do Projeto"/>
            </div>
            <div>
                <SubmitButton text={btnText}/>
            </div>
        </form>
    )
}

export default ProjectForm