import { getProviders, signIn, useSession } from 'next-auth/react'

function Login({ providers }) {
    const {data:session}=useSession();
    console.log(session)
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-black">
            <img className="mb-5 w-52" src="https://links.papareact.com/9xl" alt="" />
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button className=" bg-[#18D860] text-white p-5 rounded-full"
                        onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Login;

export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: {
            providers
        }
    }
}
