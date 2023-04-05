import prisma from "../config/prisma.config.js";

//Search for movies
export const searchMovieTerm = async (searchTerm) => {
    console.log(searchTerm)

    const genre = await prisma.genre.findFirst({
        where: {
            name: { contains: searchTerm, mode: 'insensitive' }
        }
    })

    if (genre) {
        const movies = await prisma.movie.findMany({
            where: {
                OR: [
                    { title: { contains: searchTerm, mode: 'insensitive' } },
                    { description: { contains: searchTerm, mode: 'insensitive' } },
                    { genreId: { contains: genre.id, mode: 'insensitive' } }
                ]
            },
            take: 20
        })
        return movies
    } else {
        const movies = await prisma.movie.findMany({
            where: {
                OR: [
                    { title: { contains: searchTerm, mode: 'insensitive' } },
                    { description: { contains: searchTerm, mode: 'insensitive' } }
                ]
            },
            take: 20
        })

        console.log(movies)

        return movies
    }
};




// //search for all products , filter, sort,page,limit
// const getProducts = async ({ search, filter, sort, page, limit }) => {
//     const skip = (page - 1) * limit;
//     const where = {
//         OR: [
//             { name: { contains: search } },
//             { description: { contains: search } },
//             { category: { contains: search } }
//         ],
//         ...filter
//     };
//     const orderBy = sort ? { [sort]: 'asc' } : undefined;

//     const products = await prisma.product.findMany({
//         skip,
//         take: limit,
//         where,
//         orderBy
//     });

//     return products;
// };
// // Retrieve all products
// const allProducts = await getProducts({});

// // Retrieve products with a search keyword
// const searchedProducts = await getProducts({ search: 'red' });

// // Retrieve products with a filter criteria
// const filteredProducts = await getProducts({ filter: { category: 'clothing' } });

// // Retrieve products with sorting
// const sortedProducts = await getProducts({ sort: 'price' });

// // Retrieve paginated products
// const paginatedProducts = await getProducts({ page: 2, limit: 10 });





