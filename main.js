// Axios Globals
// if you have multiple protected routes this feature is helpful

//note: this way auth-token is sent to all routes
// axios.defaults.headers.common["auth"] =
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

// if you don't want auth-token to be included to all rotes you should use custom instance

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
  headers: { "test-header": "test-value" },
});

instance.defaults.headers.common["autho"] = "a jenki number";


// GET REQUEST
function getTodos() {
  console.log("GET Request");
  // axios("/posts", {
  //   params: { _limit: 5 },
  // })
  //   .then((res) => {
  //     console.log(res);
  //     showOutput(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  instance
    .get("/posts", { params: { _limit: 5 } })
    .then((res) => {
      console.log(res);
      showOutput(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

// POST REQUEST
function addTodo() {
  console.log("POST Request");
  axios
    .post("https://jsonplaceholder.typicode.com/posts", {
      title: "new title",
      body: "new body",
    })
    .then((res) => {
      console.log(res);
      showOutput(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

// PUT/PATCH REQUEST
function updateTodo() {
  console.log("PUT/PATCH Request");
  // axios
  //   .put("https://jsonplaceholder.typicode.com/posts/1", {
  //     title: "new title",
  //     body: "new body",
  //   })
  //   .then((res) => {
  //     console.log(res);
  //     showOutput(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  axios
    .patch("https://jsonplaceholder.typicode.com/posts/1", {
      body: "new body",
    })
    .then((res) => {
      console.log(res);
      showOutput(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

// DELETE REQUEST
function removeTodo() {
  console.log("DELETE Request");
  axios
    .delete("https://jsonplaceholder.typicode.com/posts/1")
    .then((res) => {
      console.log(res);
      showOutput(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

// SIMULTANEOUS DATA
function getData() {
  console.log("Simultaneous Request");
  Promise.all([
    axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
  ])
    .then((res) => {
      console.log(res[0]);
      console.log(res[1]);
      // showOutput(res[0]);
      // showOutput(res[1]);
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
      // console.log(err[1].response)
    });
}

// CUSTOM HEADERS
function customHeaders() {
  console.log("Custom Headers");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "JWT",
    },
  };
  axios
    .post(
      "https://jsonplaceholder.typicode.com/posts",
      { title: "new title", body: "new body" },
      config
    )
    .then((res) => {
      console.log("the response after setting the headers");
      console.log(res);
      showOutput(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log("Transform Response");
}


// Cancel request
const controller = new AbortController();
// ERROR HANDLING
function errorHandling() {
  console.log("Error Handling");
  axios
    .get("https://jsonplaceholder.typicode.com/posts", {
      signal: controller.signal,
    })
    .then((res) => {
      console.log(res);
      showOutput(res);
    })
    .catch((err) => {
      console.log(err);
      // console.log(err.request);
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.header);
    });

    controller.abort()
}

// CANCEL TOKEN
function cancelToken() {
  console.log("Cancel Token");
  console.log(controller.signal)
  controller.abort();
  console.log(controller.signal)
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  (config) => {
    // console.log(config.method);
    // console.log(config.url);
    // console.log(config.params);
    // console.log(config.data);
    return config;
  },
  (err) => {
    // console.log(err);
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (response) => {
    // console.log(url, " ", config.url);
    // console.log(params, " ", config.params);
    // console.log(data, " ", config.data);
    // console.log(response);
    // console.log(config)
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);
// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
