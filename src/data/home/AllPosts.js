import { formatRelative, sub } from "date-fns";
import friendsData from "../../data/profile/FriendsData";
import { findNameInObject, DisplayRelativeTime } from "../../utilities/Utils";

const [ peterData, wandaData, stephenData, natashaData, tonyData ] = [
    findNameInObject("Peter Parker", friendsData), 
    findNameInObject("Wanda Maximoff", friendsData),
    findNameInObject("Stephen Strange", friendsData), 
    findNameInObject("Natasha Romanoff", friendsData),
    findNameInObject("Tony Stark", friendsData)
];

var currentDate = new Date();

const allPosts = [
    {
        poster: tonyData.name,
        avatar: tonyData.imgSrc,
        content: "Just curious about everyones personal favorite movies with the best soundtrack. My favorite is Shutter Island",
        timePosted: sub(currentDate, { minutes: 24 }),
        relativeTime: "",
        likes: 1,
        likedByUser: false,
        comments: [],
        postId: 41351,
        postCreatorId: tonyData.userId
    },
    {
        poster: wandaData.name,
        avatar: wandaData.imgSrc,
        content: `Kelly Clarkson's cover of Selena Gomez's "Lose you to love me" was beautiful! Go check it out!`,
        timePosted: sub(currentDate, {hours: 1}),
        relativeTime: "",
        likes: 5,
        likedByUser: false,
        comments: [
            {
                commenter: peterData.name,
                avatar: peterData.imgSrc,
                content: "Just listened to it and was pretty impressed. Definitely a fan of Kelly Clarkson now",
                timePosted: sub(currentDate, { hours: 2, minutes: 12 }),
                relativeTime: "",
                likes: 1,
                likedByUser: false,
                commentId:  8513
            }
        ],
        postId: 91283,
        postCreatorId: wandaData.userId
    },
    {
        poster: stephenData.name,
        avatar: stephenData.imgSrc,
        content: "Can't wait to listen to Luke Bryan's album on his world tour this year!",
        timePosted: sub(currentDate, {hours: 4, minutes: 47}),
        relativeTime: "",
        likes: 10,
        likedByUser: false,
        comments: [
            {
                commenter: natashaData.name,
                avatar: natashaData.imgSrc,
                content: "Same here, so excited!!!!",
                timePosted: sub(currentDate, { hours: 6 }),
                relativeTime: "",
                likes: 1,
                likedByUser: false,
                commentId:  6241
            }
        ],
        postId: 3191,
        postCreatorId: stephenData.userId
    }, 
    {
        poster: tonyData.name,
        avatar: tonyData.imgSrc,
        content: "Just found my old iphone shuffle in a random box in my house. Good memories haha",
        timePosted: sub(currentDate, {hours: 8, minutes: 36}),
        relativeTime: "",
        likes: 14,
        likedByUser: false,
        comments: [
            {
                commenter: wandaData.name,
                avatar: wandaData.imgSrc,
                content: "lol yeah the good old days",
                timePosted: sub(currentDate, { hours: 9, minutes: 1 }),
                relativeTime: "",
                likes: 4,
                likedByUser: false,
                commentId:  1293
            },
            {
                commenter: peterData.name,
                avatar: peterData.imgSrc,
                content: "Haha wow, I bet your music taste is way different from now",
                timePosted: sub(currentDate, { hours: 10, minutes: 45 }),
                relativeTime: "",
                likes: 2,
                likedByUser: false,
                commentId:  41728
            }
        ],
        postId: 57103,
        postCreatorId: tonyData.userId
    }
    
];


for (const post of allPosts) {
    post.relativeTime = DisplayRelativeTime(post.timePosted, currentDate);
    post.timePosted = formatRelative(post.timePosted, currentDate).toString();
    for (const comment of post.comments) {
        comment.relativeTime = DisplayRelativeTime(comment.timePosted, currentDate);
        comment.timePosted = formatRelative(comment.timePosted, currentDate).toString();
    }
}

export default allPosts;