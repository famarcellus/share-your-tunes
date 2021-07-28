import { formatRelative, sub } from "date-fns";
import userData from "../../data/profile/UserData";
import friendsData from "../../data/profile/FriendsData";
import { findNameInObject, DisplayRelativeTime } from "../../utilities/Utils";

const [ peterData, wandaData, stephenData, natashaData ] = [
    findNameInObject("Peter Parker", friendsData), 
    findNameInObject("Wanda Maximoff", friendsData),
    findNameInObject("Stephen Strange", friendsData), 
    findNameInObject("Natasha Romanoff", friendsData)
];

var currentDate = new Date();

const userPosts = [
    {
        poster: userData.name,
        avatar: userData.imgSrc,
        content: "Anyone got some good music recommendations?",
        timePosted: sub(currentDate, {hours: 3, minutes: 19}),
        relativeTime: "",
        likes: 1,
        likedByUser: false,
        comments: [
            {
                commenter: natashaData.name,
                avatar: natashaData.imgSrc,
                content: `Not really "new" but you should try checking out "Sgt. Pepper's Lonely Hearts Club Band" by the Beatles. One of my favorite albums`,
                timePosted: sub(currentDate, {hours: 2, minutes: 21}),
                relativeTime: "",
                likes: 1,
                likedByUser: false,
                commentId:  23810
            },
            {
                commenter: stephenData.name,
                avatar: stephenData.imgSrc,
                content: "Honestly have been looking for some new music too. I'll let you know if I find anything!",
                timePosted: sub(currentDate, {hours: 1}) ,
                relativeTime: "",
                likes: 0,
                likedByUser: false,
                commentId:  4913
            },
            
        ],
        postId: 38106,
        postCreatorId: userData.userId
    },
    {
        poster: userData.name,
        avatar: userData.imgSrc,
        content: "Whoa, the soundtrack in the latest Avengers movie was amazing!",
        timePosted: sub(currentDate, {days: 3, hours: 12}),
        relativeTime: "",
        likes: 1,
        likedByUser: false,
        comments: [],
        postId: 17516,
        postCreatorId: userData.userId
    },
    {
        poster: userData.name,
        avatar: userData.imgSrc,
        content: "Life wouldn't be the same if we didn't have music",
        timePosted: sub(currentDate, {days: 5, hours: 3}),
        relativeTime: "",
        likes: 2,
        likedByUser: false,
        comments: [
            {
                commenter: peterData.name,
                avatar: peterData.imgSrc,
                content: "Couldn't agree more!",
                timePosted: sub(currentDate, {days: 4, hours: 2}),
                relativeTime: "",
                likes: 0,
                likedByUser: false,
                commentId:  3821
            },
            {
                commenter: wandaData.name,
                avatar: wandaData.imgSrc,
                content: "Was thinking the same thing haha",
                timePosted: sub(currentDate, {days: 4, hours: 2}),
                relativeTime: "",
                likes: 0,
                likedByUser: false,
                commentId:  7583
            }
        ],
        postId: 5820,
        postCreatorId: userData.userId
    }, 
    
];


for (const post of userPosts) {
    post.relativeTime = DisplayRelativeTime(post.timePosted, currentDate);
    post.timePosted = formatRelative(post.timePosted, currentDate).toString();
    for (const comment of post.comments) {
        comment.relativeTime = DisplayRelativeTime(comment.timePosted, currentDate);
        comment.timePosted = formatRelative(comment.timePosted, currentDate).toString();
    }
}

export default userPosts;