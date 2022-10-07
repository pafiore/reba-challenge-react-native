import { useEffect, useState } from 'react';
import { TIME_OUT_END_POINT } from '../constants';

const useFetch = <T>(url: string) => {

	const [data, setData] = useState<T>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isError, setIsError] = useState<boolean>(false);
    const [apiCall, retryApiCall] = useState<boolean>(false);

	useEffect(() => {

        // Timeout EndPoint
        let controller = new AbortController()
        setTimeout(() => controller.abort(), TIME_OUT_END_POINT); 
        
        fetch(url, {signal: controller.signal})
            .then(res => res.json())
            .then(json => {
                // WORKAROUND: dado que la API devuelve más de un nivel en la estructura del JSON, segun se invoque a la
                // Lista o al detalle, se creó este workaround para distinguirlos ya que el setData sera diferente.
                url.split("/").pop() === "products" ? setData(json.products) : setData(json)
                
                setIsError(false);
            })
            .catch(err => {
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            })
	}, [url, apiCall]);

	return [data, isLoading, isError, retryApiCall] as const;
};

export default useFetch;