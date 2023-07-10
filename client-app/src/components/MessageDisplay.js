function MessageDisplay({ message, title }) {
    return (
        <div>
            <h3> {title} </h3>
            <p> {message} </p>
        </div>
    )
}

export default MessageDisplay