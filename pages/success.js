import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from './../components/AppLayout/AppLayout';
import { getAppProps } from "../utils/getAppProps";


export default function Success(props) {
    async function handleClick() {
        
    }
    return (
        <div className="block">
            Thank you for your purchase!
        </div>
    )
}

Success.getLayout = function getLayout(page, pageProps) {
    return <AppLayout {...pageProps}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx) {
        const props = await getAppProps(ctx);
        return {props}
    }
    
});