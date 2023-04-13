import axios from "axios";
import getCurrentUserId from "./getCurrentUserId";

export const updateUserName = () => {
    axios.get('http://127.0.0.1:8001/user/' + getCurrentUserId())
    .then((res) =>{
        const currentUserName = res.data.user.name;

        const user = window.localStorage.getItem('user');
        const parsedUser = JSON.parse(user)

        parsedUser.name = currentUserName;
        window.localStorage.setItem('user', JSON.stringify(parsedUser))
    } )
}

const getCurrentUserName = () => {
    const user = window.localStorage.getItem('user');
    const parsedUser = JSON.parse(user)

    return parsedUser?.name;
}

export default getCurrentUserName;