import axios from "axios"

const HTTP = () => {
  return axios.create({
    baseURL: "http://localhost:3005",
  })
}

const bypropFunctions = {
  province: function () {
    return HTTP()
      .get("/v1/common/province")
      .then((res) => {
        console.log("return API " + res)
        return res
      })
  },
}

export default {
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, "$bypropAPI", {
      value: bypropFunctions,
    })
  },
}
