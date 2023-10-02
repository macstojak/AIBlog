import { withPageAuthRequired } from "@auth0/nextjs-auth0";


export default function TokenTopUp(props) {
    return (
        <div>This is the TokenTopUp page</div>
    )
}
export const getServerSideProps = withPageAuthRequired(() => {
    return {
        props: {
        },
    }
});