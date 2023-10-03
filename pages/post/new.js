import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from './../../components/AppLayout/AppLayout';
import {useState} from "react";

export default function NewPost(props) {
    const [postContent, setPostContent] = useState('');
    const [topic, setTopic] = useState('');
    const [keywords, setKeywords] = useState('');
    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch(`/api/generatePost`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({topic, keywords})
        })
        const json = await response.json();
        setPostContent(json.post.postContent);
    }
    return (
        <>
            <form action="handleSubmit">
                <div>
                    <label htmlFor=""><strong>Generate a blog post on topic of:</strong></label>
                    <textarea className="resize-none border-slate-500 w-full block my-2 px-4 py-2 rounded-sm" name="topic" id="topic" cols="30" rows="10" value={topic} onChange={(e) => setTopic(e.target.value)}></textarea>
                </div>
                <div>
                    <label htmlFor=""><strong>Targeting the following keywords:</strong></label>
                    <textarea className="resize-none border-slate-500 w-full block my-2 px-4 py-2 rounded-sm" name="keywords" id="keywords" cols="30" rows="10" value={keywords} onChange={(e) => setKeywords(e.target.value)}></textarea>
                
                </div>
            <button type="submit" className="btn">
                Generate
            </button>
            </form>
            <div className="max-w-screen-sm p-10" dangerouslySetInnerHTML={{__html: postContent}}></div>
           
        </>
    )
}

NewPost.getLayout = function getLayout(page, pageProps) {
    return <AppLayout {...pageProps}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired(() => {
    return {
        props: {
        },
    }
});