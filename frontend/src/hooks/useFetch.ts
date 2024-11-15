import { useState, useEffect } from 'react';

const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!url) {
      setError('No URL provided');
      return;
    }
  
    const fetchData = async () => {
      setLoading(true);
    
      try {
        const res = await fetch(url, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        if (!res.ok) {
          console.error('Response Status:', res.status);
          console.error('Response Text:', res.statusText);
          throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        }
    
        const result = await res.json();
        setData(result.data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetch;