import serverAuth from "@/lib/serrverAuth";
import prismadb from "@/lib/prismadb";


export default async function handler(req, res) {


    if(req.method !=='GET'){
        return res.status(405).end()
    }

    try {

        await serverAuth(req)
        const {movieId} = req.query

        if(typeof movieId !== 'string'){
            throw new Error('Invalid ID')
        }

        if(!movieId){
            throw new Error('Invalid ID non exixts')
        }

        const movie = await prismadb.movie.findUnique({
            where:{
                id:movieId
            }
        })

        if(!movie){
            throw new Error('Invalid ID no ivie')
        }

        return res.status(200).json(movie);
        
    } catch (error) {
        console.log('err',error);
        return res.status(400).end();

    }

}