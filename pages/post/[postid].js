import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function Post() {
    return (
        <div>This is the Post page</div>
    )
}

export const getServerSideProps = withPageAuthRequired(() => {
    return {
        props: {
        },
    }
});