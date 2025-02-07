import { useEffect, useState } from "react";


function useFetch(url) {
    const [data, setData] = useState([]);
    const fetchData = () => {
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(result => {
                setData(result);
            })
    }
    useEffect(() => {
        fetchData();
    });
    return data;
}

export default useFetch;