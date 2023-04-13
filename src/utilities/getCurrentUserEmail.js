const getCurrentUserEmail = () => {
    const user = window.localStorage.getItem('user');
    const parsedUser = JSON.parse(user)

    return parsedUser?.email;
}

export default getCurrentUserEmail;