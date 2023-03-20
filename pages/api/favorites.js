import serverAuth from "@/lib/serrverAuth";
import prismadb from "@/lib/prismadb";
import { without } from "lodash";

export default async function handler(req, res) {

    if (req.method !== "GET") {
        return res.status(405).end()
    }
    try {

        const { currentUser } = await serverAuth(req);

        const favoritedMovies = await prismadb.movie.findMany({
            where: {
                id: {
                    in: currentUser?.favoriteIds,
                }
            }
        });

        return res.status(200).json(favoritedMovies);


    } catch (error) {
        console.log('err', error);
        return res.status(400).end()

    }
}