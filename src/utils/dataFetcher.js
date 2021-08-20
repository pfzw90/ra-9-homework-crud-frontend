export default function dataFetcher(url, method = "GET", initialData = null) {
    return async function fetchData() {

        const link = process.env.REACT_APP_POSTS_URL + url;
        let result;
        try {
            const response = await fetch(
                    link,
                 {
                     method: method,
                     body: (method === 'POST') ? JSON.stringify(initialData) : null
                 })
            if (!response.ok) throw new Error(`Ошибка загрузки: ${response.status}(${response.statusText})`);
            try {
                result = await response.json();
                } catch(e) {
                throw new Error('Ошибка парсинга'+ e)
                }
        } catch(e) {
           result = e.text;
        } finally {
            return result;
        }
}}


