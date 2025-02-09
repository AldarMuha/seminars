import { useEffect, useState } from "react";


function useFetch(url) {
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
    }, [url]);
    return [data, isLoading, error];
}

export default useFetch;