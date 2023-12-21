import styles from './Container.modules.css'

function Container(props){
    return (
    <div>
        {props.children}
    </div>
    )
}

export default Container