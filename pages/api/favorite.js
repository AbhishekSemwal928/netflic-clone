import serverAuth from "@/lib/serrverAuth";
import prismadb from "@/lib/prismadb";
import { without } from "lodash";

export default async function handler(req, res) {

    try {

        if (req.method === "POST") {
            const { currentUser } = await serverAuth(req)

            const { movieId } = req.body

            const exixtingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId
                }
            })

            if (!exixtingMovie) {
                throw new Error('Invalid Id')
            }

            const user = await prismadb.user.update({
                where: {
                    email: currentUser.email || ''
                },
                data: {
                    favoriteIds: {
                        push: movieId
                    }
                }
            })
            return res.status(200).json(user)

        }

        if (req.method === "DELETE") {
            const { currentUser } = await serverAuth(req)

            const { movieId } = req.body

            const exixtingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId
                }
            })

            if (!exixtingMovie) {
                throw new Error('Invalid Id NOt exixts')
            }

            const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

            const updatedUser = await prismadb.user.update({
                where: {
                    email: currentUser.email || ''
                },
                data: {
                    favoriteIds: updatedFavoriteIds
                }
            })
            return res.status(200).json(updatedUser)
        }

        return res.status(405).end()

    } catch (error) {
        console.log('err', error);
        return res.status(400).end()

    }
}