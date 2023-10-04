import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from './../../components/AppLayout/AppLayout';
import {useState} from "react";
import { useRouter } from "next/router";
import { getAppProps } from "../../utils/getAppProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain } from "@fortawesome/free-solid-svg-icons";
export default function NewPost(props) {
    const router = useRouter()
    const [topic, setTopic] = useState('');
    const [keywords, setKeywords] = useState('');
    const [loading, setLoading] = useState(false);
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try{
        const response = await fetch(`/api/generatePost`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({topic, keywords})
        })
        const json = await response.json();
        if(json?.postId){
            router.push(`/post/${json?.postId}`)
        }
    }catch(e) {
        console.log("Error",e);
        setLoading(false);
    }
    }
    return (
        <div className="h-full overflow-hidden">
            {loading && (
            <div className="text-green-500 flex h-full animate-pulse w-full flex-col justify-center items-center">
                <FontAwesomeIcon icon={faBrain} className="text-8xl"/>
                <h6>Generating...</h6>
            </div>
)}
            {!loading && (
            <div className="w-full h-full flex flex-col overflow-auto">
            <form onSubmit={handleSubmit} className="m-auto w-full max-w-screen-sm bg-slate-100 p-4 rounded-md shadow-xl shadow-slate-200 border border-slate-200">
                <div>
                    <label htmlFor=""><strong>Generate a blog post on topic of:</strong></label>
                    <textarea className="resize-none border-slate-800 w-full block my-2 px-4 py-2 rounded-sm" name="topic" id="topic" value={topic} onChange={(e) => setTopic(e.target.value)}
                    maxLength={80}>
                        
                    </textarea>
                </div>
                <div>
                    <label htmlFor=""><strong>Targeting the following keywords:</strong></label>
                    <textarea className="resize-none border-slate-800 w-full block my-2 px-4 py-2 rounded-sm" name="keywords" id="keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)}
                    maxLength={80}></textarea>
                    <small className="block mb-2">Separate keywords with a comma</small>
                
                </div>
            <button type="submit" className="btn" disabled={!topic.trim() || !keywords.trim()}>
                Generate
            </button>
            </form>
            </div>
            )}
        </div>
    )
}

NewPost.getLayout = function getLayout(page, pageProps) {
    return <AppLayout {...pageProps}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx) {
        const props = await getAppProps(ctx);
        if(!props.availableTokens) {
            return {
                redirect: {
                    destination: "/token-topup",
                permanent: false
                }
            }
        }
        return {props}
    }
});