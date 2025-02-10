import { useState } from "react";

function Modal({ seminar, onClose }) {
    const [title, setTitle] = useState(seminar.title);
    const [description, setDescription] = useState(seminar.description);
    const [photo, setPhoto] = useState(seminar.photo);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setPhoto(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedSeminar = {
            ...seminar,
            title,
            description,
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
                onClose();
            })
            .catch(error => {
                console.error(error);
                alert('Не удалось обновить семинар');
            })
    }
    if (!seminar) {
        return null;
    }
    return (
        <div className="modal-container">
            <div className="modal">
                <form className="modal-form form" method="post" action="#" onSubmit={handleSubmit}>
                    <label className="form-label" htmlFor="title">Название семинара</label>
                    <input className="form-input" type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                    <label className="form-label" htmlFor="description">Описание семинара</label>
                    <textarea id="description" rows="5" cols="33" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    <label className="form-label" htmlFor="photo">URL изображения</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    {photo && <img src={photo} alt="Preview" style={{ width: '200px', height: '200px' }} />}
                    <button type="submit">Отправить</button>
                    <button type="button" onClick={onClose}>Закрыть</button>
                </form>
            </div>
        </div>
    );
}

export default Modal;
