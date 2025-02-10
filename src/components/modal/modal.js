function Modal({seminar, onClose}) {
    if (!seminar) {
        return null;
    }
    return (
        <div className="modal-container">
            <div className="modal">
                <form className="modal-form form" method="post" action="#">
                    <label className="form-label" htmlFor="title">Название семинара</label>
                    <input className="form-input" type="text" id="title" defaultValue={seminar.title}></input>
                    <label className="form-label" htmlFor="description" defaultValue={seminar.description}>Описание семинара</label>
                    <textarea id="description" rows="5" cols="33"></textarea>
                    <button type="submit">Отправить</button>
                    <button type="button" onClick={onClose}>Закрыть</button>
                </form>
            </div>
        </div>
    );
}

export default Modal;
