// src/graphql/resolvers.ts
const movies = [
  {
    id: "1",
    title: "Inception",
    thumbnail: "/",
    description: "A mind-bending thriller",
    releaseDate: "2010-07-16",
    genre: ["Sci-Fi", "Action"],
    rating: 8.8,
    duration: 148,
  },
  {
    id: "2",
    title: "The Matrix",
    thumbnail: "/",
    description: "A sci-fi classic",
    releaseDate: "1999-03-31",
    genre: ["Sci-Fi", "Action"],
    rating: 8.7,
    duration: 136,
  },
];

// Resolver for fetching data
export const resolvers = {
  Query: {
    movies: () => movies,
    getMovie: (parent: any, args: { id: string }) =>
      movies.find((movie) => movie.id === args.id),
  },
};
