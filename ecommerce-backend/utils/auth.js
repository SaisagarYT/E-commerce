const isLoggedIn = () =>{
    return !!localStorage.getItem('token');
};

module.exports = isLoggedIn;