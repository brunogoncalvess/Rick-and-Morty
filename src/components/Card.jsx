import "./Card.css"

const Card = ({character, handleModalContent, openModal}) => {
    return (
        <div className={"card-container"} onClick={() => handleModalContent(character.id, character)}>
            <div className={character.status.toLowerCase()} onClick={openModal}>
                <div className="card-img">
                    <img src={character.image} alt={character.name} />
                </div>
                <div className={"card-info"}>
                    <h2>{character.name}</h2>            
                    <span><strong>Status: </strong>{character.status}</span>
                </div>
            </div>
        </div>
    )
}

export default Card