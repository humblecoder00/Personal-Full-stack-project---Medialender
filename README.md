# Medialender v1: A Personal MERN (MongoDB, Express, React, Node) Stack Project:

## About:

Medialender is a responsive full stack web application for an imaginary movie renting / management business.
Users can sign-up and access / modify data based on their level of authorization.

## Roles:

`Visitor:` Can view the movie list but not authorized to see the movie details unless logs in.

`Customers:` Can sign up via `Become a Customer` as a `Basic` or `Gold` member and can view movie details & rent movies from the list. Customer is also able to see the personal rental history on profile section.

`Editors:` Can sign up via `Become an Editor` and edit existing movies or add new movies. However, editor is not authorized to delete them and cannot rent a movie.

`Admin`: Admin account is set from database only. Admin can view / modify data of all customers, editors, rentals and movies with full authentication.

## Main technologies used during development:

`Front-end:` Built with using ReactJS, along with some handy npm packages. Bootstrap for speeding the CSS work as well as custom hard coded CSS on some areas (example: Responsive Navbar Menu, Loading spinner)

`Back-end:` Built with using NodeJS and Express, along with some handy npm packages. Database is running on MongoDB Atlas cloud service.

## Credits:
Developed based on Mosh Hamedani's "Vidly" project and added extra features and functionalities.
"Vidly" is featured on his "Mastering React" and "The Complete Node.js" courses:

https://codewithmosh.com/p/mastering-react

https://codewithmosh.com/p/the-complete-node-js-course


## Live version: https://medialenderonline.herokuapp.com
