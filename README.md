# Camp Project

Camp project is a nodejs webside providing the information of camps such as name, location, rent price and user reviews as well as account system for authentication and authorization. All webside data is created or provided by users and is stored in mongo atlas exept images, which will be save in cloudinary. Frontend uses HTML, bootstrap 5, css and javascript while backend uses nodejs. Besides, this website is also written according to the MVC (Model–View–Controller) pattern and use restful api for almost features.

**Link website:** [click here](https://pure-atoll-66430.herokuapp.com/){:target="_blank"}

## Technologies/package dependencies:

1. [@mapbox/mapbox-sdk:](https://www.npmjs.com/package/@mapbox/mapbox-sdk){:target="_blank"} use to work with mapbox API. In website, it will show each location map and a big cluster map for all location. 
1. [cloudinary:](https://www.npmjs.com/package/cloudinary){:target="_blank"} connect with a cloud server to store and change images using in website. Link of each images will be saved in database and access in necessary 
1. [connect-flash:](https://www.npmjs.com/package/connect-flash){:target="_blank"} show message and clear ater being displayed through middleware
1. [connect-mongo:](https://www.npmjs.com/package/connect-mongo){:target="_blank"} use to store created session into mongodb and save as a collection
1. [dotenv:](https://www.npmjs.com/package/dotenv){:target="_blank"} save environment configuration in a file .env like token, key, link database connection... 
1. [ejs:](https://www.npmjs.com/package/ejs){:target="_blank"} create generate HTML markup with plain JavaScript
1. [ejs-mate:](https://www.npmjs.com/package/ejs-mate){:target="_blank"} use to create layout (header, navbar. footer) and some other components fit with ejs
1. [express:](https://www.npmjs.com/package/express){:target="_blank"} provide routes and HTTP helpers (redirection). More specific:
    * GET request:
        * / : homepage
        * /register : register form
        * /login : login form
        * /campgrounds : show cluster map and all campgrounds
        * /campgrounds/new : create new campground
        * /campgrounds/:id : show campground details
        * /campgrounds/:id/edit: edit form of campground details
    * POST request:
        * /campgrounds : create a new 
        * /campgrounds/reivews: create a review
        * /register : create a new user
        * /login : check logined user and allow to access or not
    * PUST request:
        * /campgrounds/:id : edit campground details
    * DELETE request:
        * /campgrounds/:id : delete campground
        * /campgrounds/reivews/:reviewId : delete a review
1. [express-mongo-sanitize:](https://www.npmjs.com/package/express-mongo-sanitize){:target="_blank"} prevent MongoDB Operator Injection
1. [express-session:](https://www.npmjs.com/package/express-session){:target="_blank"} use middleware create session on web browser and save as cookie 
1. [helmet:](https://www.npmjs.com/package/helmet){:target="_blank"} provide 11 middleware to enhance website's security 
1. [joi:](https://www.npmjs.com/package/joi){:target="_blank"} provide data valiation for post or put request to server
1. [method-override:](https://www.npmjs.com/package/method-override){:target="_blank"} use PUT and DELETE methods in HTML Form
1. [mongoose:](https://www.npmjs.com/package/mongoose){:target="_blank"} create object models for mongodb and provide promises and callbacks
1. [multer:](https://www.npmjs.com/package/multer){:target="_blank"} is a middleware to support uploading files or images.
1. [multer-storage-cloudinary:](https://www.npmjs.com/package/multer-storage-cloudinary){:target="_blank"} is multer but use on cloudinary
1. [passport:](https://www.npmjs.com/package/passport){:target="_blank"} is a middleware to support authentication 
1. [passport-local:](https://www.npmjs.com/package/passport-local){:target="_blank"} is also passport but using username and password
1. [passport-local-mongoose:](https://www.npmjs.com/package/passport-local-mongoose){:target="_blank"} combine with model to create object and may save it in mongodb
1. [sanitize-html:](https://www.npmjs.com/package/sanitize-html){:target="_blank"} remove HTML tag when collect informtion if user intentionally do it