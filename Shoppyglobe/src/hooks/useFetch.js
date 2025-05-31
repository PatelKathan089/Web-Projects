import { useState, useEffect, useCallback } from "react";

export const useFetch = (url, reqObj) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const res = await fetch(url, reqObj);
            const data = await res.json();
            setData(data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    }, [url, JSON.stringify(reqObj)]);

    useEffect(() => {
        fetchData();
    }, [url, JSON.stringify(reqObj)]);

    return { data, loading, error, reFetch: fetchData };
};
