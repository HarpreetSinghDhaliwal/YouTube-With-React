// import React from 'react'

// const VideoDetail = ({video}) => {
//     if (!video) {
//         return <div>Loading...</div>
//     }
//     const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`
//     prompt(videoSrc);
//     return <div>
//         <div className="ui embed">
//             <iframe title="Video Player" src={videoSrc}/>
//         </div>
//         <div className="ui segment ">
//             <h4 className="ui header">
//                 {video.snippet.title}
//             </h4>
//             {/* <p>{video.snippet.comments}</p> */}
//             <p>{video.snippet.description}</p>
           
//         </div>
//         <div className="ui segment ">
//             <h4 className="ui header">
//                 {video.snippet.title}
//             </h4>
//             {/* <p>{video.snippet.comments}</p> */}
//             <p>{video.snippet.description}</p>
           
//         </div>
//     </div>
// }
// export default VideoDetail
import React, { useEffect, useState } from 'react';
import youtube from '../api/youtube';
import { config } from '../api/config';

const VideoDetail = ({ video }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (video) {
            fetchComments(video.id.videoId);
        }
    }, [video]);

    const fetchComments = async (videoId) => {
        const response = await youtube.get('/commentThreads', {
            params: {
                videoId: videoId,
                part: 'snippet',
                maxResults: 1000, // You can adjust the number of comments you want to fetch
                key: config['youtube-api-key'],
            },
        });

        setComments(response.data.items);
    };

    if (!video) {
        return <div>Loading...</div>;
    }

    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

    return (
        <div>
            <div className="ui embed">
                <iframe title="Video Player" src={videoSrc} />
            </div>
            <div className="ui segment">
                <h4 className="ui header">{video.snippet.title}</h4>
                <p>{video.snippet.description}</p>
            </div>
            <div className="ui segment">
                <h4 className="ui header">Comments</h4>
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.id}>
                            <p>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default VideoDetail;
