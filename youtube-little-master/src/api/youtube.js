import axios from "axios";
import {config} from "./config";


export default axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: {
        part: 'snippet',
        maxResult: 30,
        type: 'video',
        key: config["youtube-api-key"],

    }
});