const bcryptjs = require('bcryptjs')
const fs = require("fs")

/* let users = [{
    id : 1,
    name: "Paras",
    email: "paras@abc.com",
    mobile: 1234567890,
    password: "12345",
    profilePic: ""
    },
    {
    id: 2,
    name: 'ajay',
    email: 'ajay@abc.com',
    mobile: 9876543210,
    password: '$2a$10$klfIsAuRf/1NtAOIN0CSOe3xJ7SyxWOqXYgpqdksTMJIaxdx14faO',
    profilePic: 'picName'
  }
] */

let userData = ''
fs.readFile("./services/users.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      return;
    }
    try {
      userData = JSON.parse(jsonString);
      //console.log("UserData is:", userData); // => "Customer address is: Infinity Loop Drive"
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });


const userRegistration = (name, email, mobile, password,profilePic) => {
    const temp = {
        id: userData.length+1,
        name: name,
        email: email,
        mobile: mobile,
        password: password,
        profilePic: profilePic
    }
    userData.push(temp)
    console.log(userData)
    const jsonString = JSON.stringify(userData)
    fs.writeFileSync('./services/users.json', jsonString)
    return temp
}

const userLogin = (email,  password) => {
    let returnVal = {status: false, val: 'Invalid Userid and Password'}
    userData.forEach(user =>{
        //console.log("comparing password for ",user.name," ",bcryptjs.compareSync(password, user.password))
        //const returnVal = {message: 'Invalid Username or Password'}
        if (user.email === email && bcryptjs.compareSync(password, user.password)){
            console.log("The user is :",user)
            returnVal['status'] = true
            returnVal['val'] = user
        }
    })
    return returnVal
}

const otherInfo = (userId) => {
    let returnVal = {status: false, val: 'Invalid User id'}
    console.log("The Json File data is ", userData)
    userData.forEach(user => {
        if (user.id === Number(userId)){
            returnVal['status'] = true
            returnVal['val'] = user
        }
    })
    return returnVal
}

const profileInfo = (id) => {
    let thisUser = ''
    userData.forEach(user => {
        if (user.id === id){
            thisUser = user
        }
    })
    console.log("This user is : ", thisUser)
    return thisUser
}

const updateUserInfo = (id, name, email, mobile) => {
    let userToUpdate = ''
    userData.forEach( user => {
        console.log("userId ",user.id, "profile.id ",id)
        if (user.id === id){
            console.log("Match!!!")
            userToUpdate = userData.indexOf(user)
        }
    })
    userData[userToUpdate].name = name;
    userData[userToUpdate].email = email;
    userData[userToUpdate].mobile = mobile;
    const jsonString = JSON.stringify(userData)
    fs.writeFileSync('./services/users.json', jsonString)
    return {status: true, user: userData[userToUpdate]}
}

const changePassword = (id, password) => {
    let editUser = ''
    userData.forEach( user => {
        if (user.id === id){
            editUser = user
        }
    })
    editUser.password = password
    console.log(editUser.password)
    return {status: true,user: editUser}
}

module.exports = {
    userRegistration,
    userLogin,
    profileInfo,
    updateUserInfo,
    otherInfo,
    changePassword
}

