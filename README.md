# Offload
A place to get rid of your junk

## Table of Contents
- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [User Story](#user-story)
  - [Acceptance Criteria](#acceptance-criteria)
  - [Screenshot](#screenshots)
  - [Links](#links)
- [Installation](#installation)
  - [Install Packages](#install-packages)
  - [Environmental Variables](#setup-environmental-variables)
  - [Seed Test Data](#seed-test-data)
  - [Starting Server](#starting-server)
- [Our process](#our-process)
  - [Built with](#built-with)
  - [What We learned](#what-we-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Authors](#authors)
- [Acknowledgments](#acknowledgments)
​
## Overview
### The challenge
​Our challenge was to create app that allowed users to post junk they are looking to get rid of. The intention is for other users to see the post and want the item and then go and retreive it from the poster

### User Story
```
AS A Person with unwanted items in my home
I WANT to post my items on a site to offer it up
SO THAT others may see the item and want/be 
willing to come a get from me without me needing to deliber it to them.
```
### Acceptance Criteria
```
GIVEN a site with posted Junk
WHEN I go to the Home Page
THEN I am presented with Posts of different peoples items they are looking to get rid of.
WHEN I click on a Post
THEN I am Presented with a new page of that post.
THEN the page is populated with the Posts Title, Description, Whether or not the Item is free or if price can be discussed in person
WHEN I Click on the Sign in page
THEN I am able to sign in with my Username and Password
When I click on the Sign up Page
THEN I am able to create a profile with a unique Username and my password
WHEN I Click on the User Icon it will take me to my profile page
THEN I can see my posts and comments I have made on others posts
THEN I can select if I want to be in Dark Mode or Light mode, Update my Username, update my Password, and Add my phone number and email address. And choose whether or not I want to share that
WHEN I Click on the Home page button 
THEN it will take me back to the home Page
WHEN I can select the create Post button
THEN I will be brought to the Create a Post page.
THEN I will submit a Title, Description, Image of the Item(s), and a Location
WHEN I click on a Users name
THEN I am brought to their profile
THEN I Can see their Post and comment history, their About Me,If they share their contact info it will display
```

### Screenshots
#### The Main Landing page
![screenshot](./public/assets/images/homeLandingPage.PNG)

#### An Individual Post's Page
![screenshot](./public/assets/images/postContentPage.PNG)

#### The Create a Post Page
![screenshot](./public/assets/images/createPostPage.PNG)

#### The User Settings Page
![screenshot](./public/assets/images/userSetttings.PNG)

#### The User Profile Page
![screenshot](./public/assets/images/userPage.PNG)

#### The Sign In Page
![screenshot](./public/assets/images/signInPage.PNG)

#### The Sign Up Page
![screenshot](./public/assets/images/signUpPage.PNG)

### Links
- Live Site URL: [Offload](https://yeh-offload.herokuapp.com/)

## Installation
### Install packages
```javascript
npm i
```

### Setup environmental variables
```
DB_NAME
DB_USER
DB_PASSWORD
SESSION_SECRET
```
### Seed test data
```
node seeds
```

### Starting server
```javascript
node server
```


## Our process
### Built with
- HTML/Javascript
- CSS/Bootstrap
- Node/Express
- mySQL2/Sequelize
- Bcrypt
- NanoID
- Cloudinary

### What We learned
#### Andrew:
What I learned from this project was implementing handlebars and how it is used to grab data from the back end directly before displaying it on the page. There were some nuiances with the req parameter such as not being able to pass a body easily (not that I know of), but it was great at making the site more dynamic saving lines of code. Handlebars is definitely a way for full-stack developers to make pages easily without the stress of making multiple lines of code for little bits and pieces.

#### Daniel:
Learned how to use bootstrap more in depth, working within a dynamic front-back end team, and how to use github in a team environment better, causing less issues to arise. 

#### Jack: 
I learned the importance of creating features in an organized fashion. One of the hardest things that we had to navigate was adding features before our base layer front end and backend was complete. Building a web app in a controlled and organized way- making critical features functional before abstracting- is very important in coding effeciently and productively. I also learned how to use sequelize with more complex schemas and models than I had previously built.

#### James:
I learned a great deal about the functionality of handlebars.js and how useful it is to create dynamic webpages. I also learned a great deal from Andrew and his extensive knowledge on back end functionalities and API's. 

#### Michael:
Learned alot about the backend from Andrew and working with handlebars okay but will need more work on bootstrap. 

### Continued development ###
#### Some ideas we have for version 2.0 are: ####

- Finish free tag functionality

- Finish front end of Votes system

- Dark Mode option for users

- Implement User email into sign up and allow Google Auth

- Implement a Map functionality to allow users to check their local

- Edit individual Posts and comments

- Searchbar functionality to search for specific items

- Pay to put on the top of the page functionality "Get Seen First" styling

- Functionality for Ad's on the page

### Useful resources
- [w3Schools](https://www.w3schools.com/) - Resource with great examples and navigation between different functionality
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript) - In-depth documentation for elements or functions
- [stackoverflow](https://stackoverflow.com/) - Answered specific questions from various collaborators
- [MD Bootstrap](https://mdbootstrap.com/) - Easy to use framework that can be molded to our application needs

## Authors
* [Andrew Yeh](http://andrewyeh.dev/)
* [Daniel Holloway](https://vendettistudios.github.io/Daniel-Holloway-UCB-Portfolio/)
* [Jack Youkstetter](https://www.linkedin.com/in/jack-youkstetter-6b00a81a8/)
* [James Montogmery](https://jmonty94.github.io/portfolio/)
* [Michael Harris](https://snufalufakis.github.io/Profolio_xtralio/)

## Acknowledgments
​Thank you to our Instructor Emmanuel Jucaban and our TA's Luigi Campbell, Scott Nelson, Matthew Kaus.
