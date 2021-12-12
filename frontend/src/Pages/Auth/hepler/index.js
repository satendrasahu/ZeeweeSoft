export const getRole = (next) => {
    if (localStorage.getItem("userInfo")) {
        var loginUser = localStorage.getItem("userInfo");
        var parsedloginuser = JSON.parse(loginUser)
        var role = parsedloginuser.userType
        return role;
    }
};
export const getName = (next) => {
    if (localStorage.getItem("userInfo")) {
        var loginUser = localStorage.getItem("userInfo");
        var parsedloginuser = JSON.parse(loginUser)
        var name = parsedloginuser.userName
        return name;
    }
};
export const getId = (next) => {
    if (localStorage.getItem("userInfo")) {
        var loginUser = localStorage.getItem("userInfo");
        var parsedloginuser = JSON.parse(loginUser)
        var Id = parsedloginuser.email
        return Id;
    }
};

export const signout = (next) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("userInfo")

    }

};

export const isLoggedin = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("userInfo")) {
        return JSON.parse(localStorage.getItem("userInfo"))
    } else {
        return false;
    };

};
export const isUserLoggedIn = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("userInfo")) {
        return true
    } else {
        return false;
    };

};