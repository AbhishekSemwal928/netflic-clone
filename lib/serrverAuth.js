import { getSession } from "next-auth/react";
import prismadb from './prismadb';

const serverAuth = async (req)=>{
    const session = await getSession({req})

    if (!session) {
        throw new Error('Not Signed in')
    }

    const currentUser = await prismadb.user.findUnique({
        where:{
            email:session.user.email
        }
    })

    if(!currentUser){
        throw new Error('Not Signed in')
    }

    return {currentUser}
}

export default serverAuth