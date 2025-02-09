const DEFAULT_SRC = '/no-image.jpg';

function Card({ id, title, description, date, time, photo }) {
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
            </div>
        </li>
    );
}

export default Card;
