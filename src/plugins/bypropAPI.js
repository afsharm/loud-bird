import axios from "axios"

const HTTP = () => {
  return axios.create({
    baseURL: "http://192.168.1.7:3005",
  })
}

const bypropFunctions = {
  province: function () {
    return HTTP()
      .get("/v1/common/province")
      .then((res) => {
        //console.log("return API " + res)
        return res
      })
  },
  county: function (provinceId) {
    return HTTP()
      .get(`/v1/common/county?provinceId=${provinceId}`)
      .then((res) => {
        //console.log("return API " + res)
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
