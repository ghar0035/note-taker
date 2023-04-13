const getCurrentUserId = () => {
    const user = window.localStorage.getItem('user');
    const parsedUser = JSON.parse(user)

    return parsedUser.userId;
}

export default getCurrentUserId;