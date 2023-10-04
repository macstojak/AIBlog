import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from './../../components/AppLayout/AppLayout';
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { getSession } from "@auth0/nextjs-auth0";
import { getAppProps } from "../../utils/getAppProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHashtag} from "@fortawesome/free-solid-svg-icons";
export default function Post(props) {
    return (
        <div className="overflow-auto max-h-full">
            <div className="max-w-screen-sm mx-auto">
                 <div className="text-3xl font-bold mt-6 p-2 bg-stone-200 rounded-md">
                   SEO title and metadescription
                </div>
                <div className="p-4 my-2 border border-stone-200 rounded-md">
                    <div className="text-blue-600 text-2xl font-bold">
                        {props.title}
                    </div>
                    <div className="mt-2">
                    {props.metaDescription}
                    </div>
                </div>
                  <div className="text-3xl font-bold mt-6 p-2 bg-stone-200 rounded-md">
                  Keywords
                </div>
                <div className="flex flex-wrap pt-2 gap-1 ">
                    {props.keywords.split(",").map((keyword, i) => {
                        return <div key={i} className="p-2 rounded-full bg-slate-800 text-white">
                            <FontAwesomeIcon icon={faHashtag} width="30" height="30"/>{keyword}
                        </div>
                    })}
                </div>
                <div className="text-3xl font-bold mt-6 p-2 bg-stone-200 rounded-md">
                    Blog post
                </div>
                <div dangerouslySetInnerHTML={{__html: props.postContent || ""}}></div>
            </div>
        </div>
    )
}

Post.getLayout = function getLayout(page, pageProps) {
    return <AppLayout {...pageProps}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx) {
        const props = await getAppProps(ctx);
    const userSession = await getSession(ctx.req, ctx.res);
    const client = await clientPromise;
    const db = client.db("BlogAI");
    const user = await db.collection("users").findOne({
        auth0Id: userSession.user.sub
    });
    const post = await db.collection("posts").findOne({
        _id: new ObjectId(ctx.params.postid),
        userId: user._id
    });
    if(!post){
        return {
            redirect: {
                destination: "/post/new",
                permanent:  false,
            }
        }
    }
    return{
        props:{
            postContent: post.postContent,
            title: post.title,
            metaDescription: post.metaDescription,
            keywords: post.keywords,
            ...props
        }
    }
   }
});