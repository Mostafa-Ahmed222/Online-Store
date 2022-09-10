// const { default: axios } = require("axios");

const baseURL = "http://localhost:3000";
// display Data
let products = [];
function getData() {
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("description").value = "";
  axios({
    method: "get",
    url: `${baseURL}/products/${localStorage.getItem("userID")}`,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  })
    .then(function (response) {
      const { message, result } = response.data;
      products = result;
      showData();
    })
    .catch(function (error) {
      console.log(error);
    });
}
getData();
function showData() {
  let cartonna = ``;
  for (let i = 0; i < products.length; i++) {
    cartonna += `<tr>
        <td>${products[i].name}</td>
        <td>${products[i].price}</td>
        <td td>${products[i].description}</td>
        <td>
           <button onclick='deleteItem(${products[i].id})'
            class="btn btn-danger">Delete</button>
           <button onclick='updateItem(${products[i].id})'
            class="btn btn-success">Update</button>
           </td>
        </tr>`;
  }
  document.getElementById("tbody").innerHTML = cartonna;
}
document.getElementById("add-p").onclick = function () {
  const data = {
    name: document.getElementById("name").value,
    price: document.getElementById("price").value,
    description: document.getElementById("description").value,
    devId: localStorage.getItem("userID"),
  };
  axios({
    method: "post",
    url: `${baseURL}/product`,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    data: data,
  })
    .then(function (response) {
      const { message, result } = response.data;
      if (message == "Done") {
        getData();
        searchForm.value = "";
        window.scrollTo({ top: 1000, behavior: "smooth" });
      } else {
        alert("Invalid Data");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};
function updateItem(id) {
  document.getElementById("add-p").style.display = "none";
  document.getElementById("update-p").style.display = "block";
  axios({
    method: "get",
    url: `${baseURL}/product/${id}`,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  })
    .then(function (response) {
      const {
        message,
        result: [{ name, price, description }],
      } = response.data;
      if (message == "Done") {
        document.getElementById("name").value = name;
        document.getElementById("price").value = price;
        document.getElementById("description").value = description;
      } else {
        alert("invalid Data");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  document.getElementById("update-p").onclick = function () {
    const data = {
      name: document.getElementById("name").value,
      price: document.getElementById("price").value,
      description: document.getElementById("description").value,
      devId: localStorage.getItem("userID"),
    };
    axios({
      method: "put",
      url: `${baseURL}/product/${id}`,
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      data: data,
    })
      .then(function (response) {
        const { message, result } = response.data;
        if (message == "Done") {
          document.getElementById("update-p").style.display = "none";
          document.getElementById("add-p").style.display = "block";
          getData();
          searchForm.value = "";
          window.scrollTo({ top: 1000, behavior: "smooth" });
        } else {
          alert("Invalid Data");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
function deleteItem(id) {
  axios({
    method: "delete",
    url: `${baseURL}/product/${id}`,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  })
    .then(function (response) {
      const { message, result } = response.data;
      if (message == "Done") {
        getData();
        searchForm.value = "";
      } else {
        alert("cant delete");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

const searchForm = document.getElementById("search");
searchForm.oninput = function () {
  if (searchForm.value) {
    axios({
      method : "get",
      url: `${baseURL}/products/search/${localStorage.getItem("userID")}?key=${
        searchForm.value
      }`,
      headers: { "Content-Type": "application/json; charset=UTF-8" }
    }).then((response) => {
      const {message, result} = response.data
      if (message == "Done") {
        let cartonna = ``;
  for (let i = 0; i < result.length; i++) {
    cartonna += `<tr>
        <td>${result[i].name}</td>
        <td>${result[i].price}</td>
        <td td>${result[i].description}</td>
        <td>
           <button onclick='deleteItem(${result[i].id})'
            class="btn btn-danger">Delete</button>
           <button onclick='updateItem(${result[i].id})'
            class="btn btn-success">Update</button>
           </td>
        </tr>`;
  }
  document.getElementById("tbody").innerHTML = cartonna;
      } else {
        getData()
      }
    }).catch(function (error) {
      console.log(error);
    });
  } else {
    getData();
  }
};

document.getElementById("logout").onclick = function () {
  location.replace(
    "file:///D:/Education/courses/Route/Node%20js/Testing/new%20test/frontend/index.html"
  );
  localStorage.clear();
};