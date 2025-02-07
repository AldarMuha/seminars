function Card({ id, title, description, date, time, photo }) {
    return (
        <li className="card-item">
            <div className="card">
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}</p>
                <p className="card-date">{date}</p>
                <p className="card-time">{time}</p>
                <img className="card-photo" src={photo} alt={title} />
            </div>
        </li>
    );
}

export default Card;
