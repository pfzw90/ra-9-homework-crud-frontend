import { useHistory} from "react-router-dom"

export default function Post(props) {

    const history = useHistory()

    const handleClick = () => {
        history.push(`/posts/${props.id}`)
    }
    return (
            <div className="Post" onClick={handleClick} id={props.id}>
                <span className="Post-id">ID: {props.id}</span>
                <span className="Post-created">Created: {new Date(props.created).toLocaleString()}</span>
                <p className="Post-text">{props.content}</p>
            </div>
    )
}