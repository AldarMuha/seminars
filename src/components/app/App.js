import useFetch from '../../hooks/use-fetch';
import Card from '../card/card';

function App() {
  let url = "http://localhost:3001/seminars";
  const [seminars, isLoading, error] = useFetch(url);
  if (isLoading) {
    return (
      <p className="is-loading">Загрузка...</p>
    );
  }
  if (error) {
    return (
      <p className="error-message">Ошибка, Данные не загрузились</p>
    );
  }
  if (seminars === null || seminars.length === 0) {
    return (
      <p className="no-data">Нет семинаров</p>
    );
  }
  return (
    <div className="App">
      <h1 className="main-heading">Семинары</h1>
      <div className="cards-container">
        <h2 className="cards-heading">Список семинаров</h2>
        <ul className="card-list">
          {
            seminars.map((seminar) => (
              <Card key={seminar.id} {...seminar} />
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
