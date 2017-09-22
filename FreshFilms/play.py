#!/usr/bin/env python3

import media
import fresh_films

movies = []

# Create movies
zootopia = media.Movie("Zootopia",
                       "Animal society promotes social welfare against hostile phenomena",
                       "https://upload.wikimedia.org/wikipedia/en/e/ea/Zootopia.jpg",
                       "https://www.youtube.com/watch?v=jWM0ct-OLsM")

matrix = media.Movie("The Matrix",
                     "Hacker discovers a fascinating reality",
                     "https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/The_Matrix_Poster.jpg/220px-The_Matrix_Poster.jpg",
                     "https://www.youtube.com/watch?v=vKQi3bBA1y8")

dictator = media.Movie("The Great Dictator",
                       "An absent-minded barber opposes an angry tyrant",
                       "https://upload.wikimedia.org/wikipedia/en/thumb/4/48/The_Great_Dictator.jpg/215px-The_Great_Dictator.jpg",
                       "https://www.youtube.com/watch?v=zroWIN-lS8E")

# Add movies to list
movies.append(zootopia)
movies.append(matrix)
movies.append(dictator)

fresh_films.open_movies_page(movies)
