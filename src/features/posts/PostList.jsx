import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "./postsSlice";

export function PostList() {
    const dispatch = useDispatch();

    //Variaveis de Estado que monitoram
    const posts = useSelector((state) => state.posts.items);
    const postStatus = useSelector((state) => state.posts.status)
    const error = useSelector((state) => state.posts.error)

    //UseEffect funciona assim que renderiza o componente
    useEffect(() => {
        if (postStatus === 'idle') {
            //Thunk busca os dados
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch])

    if (postStatus === 'loading') {
        return <div className="loading">Loading Reddit...</div>
    }

    if (postStatus === 'failed') {
        return <div className="error">Huh, something went wrong: {error}</div>;
    }

    return (
        <div className="postsList">
            <h2>Ultimos Vazamentos</h2>
            {posts.map((post) => (
                <article key={post.id} className="postCard">
                    <h3>{post.title}</h3>
                    <p>Postado por: u/{post.author}</p>
                    <span>{post.score} | {post.numComments} Comments</span>
                </article>
            ))}
        </div>
    )
}