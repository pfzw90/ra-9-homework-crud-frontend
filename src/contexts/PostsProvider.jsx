import {useEffect, useState, useRef} from 'react'
import dataFetcher from '../utils/dataFetcher'
import { PostsContext } from './PostsContext'

export default function PostsProvider(props) {
    const postsRef = useRef();
    const [loading, setLoading] = useState(true);

    const refershPosts = () => {
        setLoading(true);
        dataFetcher('/')().then(result=> {
            postsRef.current = result;
            setLoading(false);
        });
    }

   useEffect(() => {
        refershPosts();
    },[])
    
    const getPost = (id) => {
        const post = postsRef.current.find(p => (p.id === Number(id)));
        return post;
    }

    const handleDelete = (id) => {
        setLoading(true)
        const deletePost = dataFetcher(`/${id}`,'DELETE');
        deletePost().then(() => refershPosts())
    }

    const handleEdit = (post) => {
        setLoading(true)
        const editPost = dataFetcher(`/`, 'POST', post);
        editPost().then(() => refershPosts())
    }

    if (!loading) return ( <PostsContext.Provider value={{postsRef, loading, getPost, handleDelete, handleEdit}}>
        {props.children}
    </PostsContext.Provider>
    ) 

    else return (
        <div className="Loading">Loading...</div>
    )
}