console.log("Script running!")

password = document.querySelector("#password")
username = document.querySelector('#username')

const signUp = () => {
    if (containsNum(password.value) == false) {
        alert("Password must contain at least 1 number!");
    }
    else if (containsCap(password.value) == false) {
        alert("Password must contain at least 1 capital letter!");
    }
    else {
        writeUserData(username.value, (password.value));
        console.log(username.value)
        console.log(password.value)
    }  
}

username.onkeypress = function () {
    if (username.value.length > 20) {
        username.value = username.value.substring(0, username.value.length - 2)
        alert("Username must be shorter than 20 characters");
    }
};


function hash(pass) {
    return new Hashes.MD5().hex(pass)
}

function containsNum(pass) {
  return /\d/.test(pass);
}

function containsCap(pass) {
  if (pass.toLowerCase() == pass) {
    return false;
  }
  else {
    return true;
  }
}

function writeUserData(user, pass) {
  firebase.database().ref().push({
    username: user,
    password: pass
  });
  location.href = "./writeNote.html";
}