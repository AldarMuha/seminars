import { useState, useEffect } from "react";

function Modal({ seminar, onClose, onUpdated }) {
    const [isSending, setIsSending] = useState(false);
    const [title, setTitle] = useState(seminar.title);
    const [description, setDescription] = useState(seminar.description);
    const [date, setDate] = useState(seminar.date);
    const [time, setTime] = useState(seminar.time);
    const [photo, setPhoto] = useState(seminar.photo);

    useEffect(() => {
        if (seminar) {
            setTitle(seminar.title);
            setDescription(seminar.description);
            setDate(seminar.date);
            setTime(seminar.time);
            setPhoto(seminar.photo);
        }
    }, [seminar]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setPhoto(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSending(true);
        const updatedSeminar = {
            ...seminar,
            title,
            description,
            date,
            photo,
        };
        fetch(`http://localhost:3001/seminars/${seminar.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedSeminar),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка обновления семинара');
                }
                onUpdated(updatedSeminar);
                onClose();
            })
            .catch(error => {
                console.error(error);
                alert('Не удалось обновить семинар');
            })
            .finally(() => {
                setIsSending(false);
            });
    };

    if (!seminar) {
        return null;
    }

    return (
        <div className="modal-container">
            <div className="modal">
                <form className="modal-form form" onSubmit={handleSubmit}>
                    <label className="form-label" htmlFor="title">Название семинара</label>
                    <input className="form-input" type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <label className="form-label" htmlFor="description">Описание семинара</label>
                    <textarea id="description" rows="5" cols="33" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    <label className="form-label" htmlFor="date">Дата</label>
                    <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    <label className="form-label" htmlFor="time">Время</label>
                    <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} />
                    <label className="form-label" htmlFor="photo">URL изображения</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    {photo && <img src={photo} alt="Preview" style={{ width: '200px', height: '200px' }} />}
                    <button type="submit" disabled={isSending}>{isSending ? 'Отправка...' : 'Отправить'}</button>
                    <button type="button" onClick={onClose}>Закрыть</button>
                </form>
            </div>
        </div>
    );
}

export default Modal;