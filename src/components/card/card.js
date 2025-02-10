const DEFAULT_SRC = '/no-image.jpg';

function Card({ title, description, date, time, photo, onClick, onEdit }) {
    const onError = (e) => {
        e.target.onerror = null;
        e.target.src = DEFAULT_SRC;
    }

    return (
        <li className="card-item">
            <div className="card">
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}</p>
                <p className="card-date">{date}</p>
                <p className="card-time">{time}</p>
                <img className="card-photo" src={photo} alt={title} width="200" height="200" onError={onError} />
                <button type="button" onClick={onEdit}>Редактировать</button>
                <button type="button" onClick={onClick}>Удалить</button>
            </div>
        </li>
    );
}

export default Card;
