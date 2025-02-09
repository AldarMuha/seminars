import useFetch from '../../hooks/use-fetch';
import Card from '../card/card';

function App() {
  let url = "http://localhost:3001/seminars";
  const seminars = useFetch(url);
  return (
    <div className="App">
      <h1 className="main-heading">Список семинаров</h1>
      <ul className="card-list">
        {
          seminars.map((seminar) => (
            <Card key={seminar.id} {...seminar} />
          ))
        }
      </ul>
    </div>
  );
}

export default App;
