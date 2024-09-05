import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        // required:true,
        // unique:true,
    },
    slug:{                      
        type:String,
        lowercase:true,
    }
});
export default mongoose.model('Category',categorySchema);

//A slug is a user-friendly, URL-safe version of a string, typically used in URLs to represent a resource (such as a blog post, product, or category) in a more readable and SEO-friendly manner. Slugs are often derived from titles or names by converting them to lowercase and replacing spaces and special characters with hyphens.