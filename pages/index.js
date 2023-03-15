import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import { getSession, signOut } from "next-auth/react";


export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }

}

export default function Home() {

  const { data: user } = useCurrentUser()

  return (
    <div>
      {/* <h1 className="text-4xl text-green-500">Welcome to netflix</h1>
      <p className="text-white ">Logged in as : {user?.name} and {user?.email}</p>
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>Logout!</button> */}

      <Navbar/>
    </div>
  )
}

