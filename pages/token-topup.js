import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from './../components/AppLayout/AppLayout';
import { getAppProps } from "../utils/getAppProps";


export default function TokenTopUp(props) {
    async function handleClick() {
        const response = await fetch(`/api/auth/addTokens`, {
            method: "POST",
            // headers: {
            //     'content-type': 'application/json'
            // },
            // body: JSON.stringify({topic, keywords})
        })
        const json = await response.json();
        // setPostContent(json.post.postContent);
    }
    return (
        <div className="block">
            <div>This is the TokenTopUp page</div>
            <button className="btn" onClick={handleClick}>Add tokens</button>
        </div>
    )
}

TokenTopUp.getLayout = function getLayout(page, pageProps) {
    return <AppLayout {...pageProps}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx) {
        const props = await getAppProps(ctx);
        return {props}
    }
    
});