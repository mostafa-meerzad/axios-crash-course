# Axios Crash Course

Axios is a powerful and popular JS library used to make HTTP requests

## making a GET request

axios by default makes a git request 

```js
axios("https://jsonplaceholder.typicode.com/posts")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));
```

but it is always a good idea to write clean and understandable code

```js
axios
  .get("https://jsonplaceholder.typicode.com/posts")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));
```

if you need routeParameters in your url

```js
axios
  .get("https://jsonplaceholder.typicode.com/posts/_limit=5")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));
```

```js
axios
  .get("https://jsonplaceholder.typicode.com/posts", {
    params: { _limit:5},
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));
```

```js
axios
  .get("https://jsonplaceholder.typicode.com/posts", {
    params: { routeParam1: value1, routeParam2: value2 },
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));
```
