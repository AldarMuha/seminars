import { useEffect, useState } from "react";

/*
function useFetch() {
    const url = 'http://localhost:3001/seminars';
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchData = (url) => {
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(result => {
                setData(result);
            })
            .catch(e => {
                setError(e);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }
    useEffect(() => {
        setIsLoading(true);
        setData(null);
        setError(null);
        fetchData(url);
    }, []);
    return [data, isLoading, error, setData];
}

export default useFetch;
*/
const useFetch = () => {
    const url = 'http://localhost:3001/seminars';
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = (url) => {
        setIsLoading(true);
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных');
                }
                return response.json();
            })
            .then(result => {
                setData(result.seminars || []); // Убедитесь, что данные приходят в формате { seminars: [...] }
            })
            .catch(e => {
                setError(e);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchData(url);
    }, [url]);

    return [data, isLoading, error, setData];
};

export default useFetch;