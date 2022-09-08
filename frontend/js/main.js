document.querySelector(".li").onclick = function () {
  document.querySelector(".signup").style.display = "none";
  document.querySelector(".su").style.display = "block";
  document.querySelector(".login").style.display = "flex";
  document.querySelector(".li").style.display = "none";
};
document.querySelector(".su").onclick = function () {
  document.querySelector(".login").style.display = "none";
  document.querySelector(
    ".li"
  ).style.cssText = `display : block; left: 38%; top: 72%;
     color: black; background-color: #fd7d31; border-radius: 6px;`;
  document.querySelector(".signup").style.display = "flex";
  document.querySelector(".su").style.display = "none";
};
const basedUrl = "http://localhost:3000";
const login = document.getElementById("login");
const signup = document.getElementById("signup");
login.onclick = function () {
  const mail = document.getElementById("email");
  const pass = document.getElementById("password");
  const email = mail.value;
  const password = pass.value;
  const data = {
    email,
    password,
  };
  axios({
    method: "post",
    url: `${basedUrl}/signin`,
    data: data,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  })
    .then(function (response) {
      const { message, result } = response.data;
      console.log(response);
      if (message == "Done") {
        localStorage.setItem("userID", result[0].id);
        window.location.replace(
          "file:///D:/Education/courses/Route/Node%20js/Testing/new%20test/frontend/product.html"
        );
      } else {
        alert("invalid email or password");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};
signup.onclick = function () {
  const data = {
    name: document.getElementById("newname").value,
    email: document.getElementById("newmail").value,
    password: document.getElementById("newpass").value,
    age: document.getElementById("newage").value,
    phone: document.getElementById("newphone").value,
  };
  if (
    document.getElementById("newpass").value ==
    document.getElementById("confirm").value
  ) {
    axios({
      method: "get",
      url: `${basedUrl}/users`,
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    })
      .then(function (response) {
        const { message, result } = response.data;
        if (message == "Done") {
          let flag = false;
          for (let i = 0; i < result.length; i++) {
            if (result[i].email == data.email) {
              flag = true;
              alert("Email already Exist");
              document.getElementById("newpass").value = "";
              document.getElementById("confirm").value = "";
            }
          }
          if (flag == false) {
            axios({
              method: "post",
              url: `${basedUrl}/users`,
              headers: { "Content-Type": "application/json; charset=UTF-8" },
              data: data,
            })
              .then(function (response) {
                const { message } = response.data;
                if (message == "Done") {
                  alert("email add successfuly please log again");
                  location.replace(
                    "file:///D:/Education/courses/Route/Node%20js/Testing/new%20test/frontend/index.html"
                  );
                } else {
                  alert("invalid Data");
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        } else {
          console.log("invalid account");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    alert("invalid confirmation of password");
    document.getElementById("newpass").value = "";
    document.getElementById("confirm").value = "";
  }
};

/* 
fetch(`${basedUrl}/signin`, {
    method: "post",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      const { message, result } = data;
      if (message == "Done") {
        localStorage.setItem("userID", result[0].id);
        location.replace(
          "file:///D:/Education/courses/Route/
          Node%20js/Testing/new%20test/frontend/product.html"
        );
      } else {
        alert("invalid email or password");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
*/

/* 
axios({
    method: "get",
    url: `${basedUrl}/users`,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  })
    .then(function (response) {
      const { message, result } = response.data;
      if (message == "Done") {
        let flag = false;
        for (let i = 0; i < result.length; i++) {
          if (result[i].email == data.email) {
            flag = true;
            alert("Email already Exist");
          }
        }
        if (flag == false) {
          axios({
            method: "post",
            url: `${basedUrl}/users`,
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            data: data
          }).then(function (response) {
            console.log(flag);
            console.log(response.data);
          }).catch(function (error) {
            console.log(error);
          });
        }
      } else {
        console.log("invalid account");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
*/
