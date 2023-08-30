import {useEffect, useState} from 'react'
import youtube from "../api/youtube";
import {config} from "../api/config";


const useVideos = (defaultSearchTerm) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        search(defaultSearchTerm)
    }, [defaultSearchTerm])

    const search = async term => {
        const response = await youtube.get("/search", {
            params: {
                q: term,
                part: "snippet",
                maxResults: 20,
                type: 'video',
                key: config["youtube-api-key"]
            }
        });

        setVideos(response.data.items);

    }
    return [videos, search];
}
export default useVideos;
