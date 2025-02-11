import { useState, useEffect } from 'react';
import Card from '../card/card';
import Modal from '../modal/modal';

function App() {
  const url = 'http://localhost:3001/seminars';
  const [seminars, setSeminars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currenSeminar, setCurrentSeminar] = useState(null);

  const fetchData = (url) => {
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(result => {
        setSeminars(result);
      })
      .catch(e => {
        setError(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    setSeminars([]);
    setError(null);
    fetchData(url);
  }, []);

  const onEdit = (seminar) => {
    setCurrentSeminar(seminar);
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    setCurrentSeminar(null);
  };

  const onDelete = (idSeminar) => {
    fetch(`http://localhost:3001/seminars/${idSeminar}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Не удалось удалить семинар');
        }
        setSeminars(seminars.filter((item) => item.id !== idSeminar));
      })
      .catch((error) => {
        console.log(error);
        alert('Не удалось удалить семинар');
      });
  };

  const updateSeminar = (updatedSeminar) => {
    setSeminars((prevSeminars) =>
      prevSeminars.map((seminar) =>
        seminar.id === updatedSeminar.id ? updatedSeminar : seminar
      )
    );
  };

  if (isLoading) {
    return <p className="is-loading">Загрузка...</p>;
  }
  if (error) {
    return <p className="error-message">Ошибка, Данные не загрузились</p>;
  }
  if (seminars.length === 0) {
    return <p className="no-data">Нет семинаров</p>;
  }

  return (
    <div className="main">
      <h1 className="main-heading">Семинары</h1>
      <div className="cards-container">
        <h2 className="cards-heading">Список семинаров</h2>
        <ul className="card-list">
          {seminars.map((seminar) => (
            <Card key={seminar.id} {...seminar} onClick={() => onDelete(seminar.id)} onEdit={() => onEdit(seminar)} />
          ))}
        </ul>
      </div>
      {isModalOpen ? <Modal seminar={currenSeminar} onClose={onCloseModal} onUpdated={updateSeminar} /> : ''}
    </div>
  );
}

export default App;