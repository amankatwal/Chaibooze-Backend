import router from "./routes/routes.js";
import {app, server} from "./app.js";
import {v2 as cloudinary} from "cloudinary";
import session from "express-session";
import passport from "passport";
import Razorpay from "razorpay";


const port =process.env.PORT;
app.set("trust proxy", 1);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie :{
        maxAge: 1000*60*60*24*7,
        secure : true,
        samesite: "none"
    }
}));

app.use(passport.initialize());
app.use(passport.session());

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_KEY,
    api_secret: process.env.CLOUDINARY_CLIENT_API_SECRET
});

export const razorpay = new Razorpay({
    key_id : process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY
})
app.use('/api',router)

server.listen(port, ()=>{
console.log(`server is running on ${port}`)
})