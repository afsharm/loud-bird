<template>
  <div>
    <h1 class="title has-text-centered">Diag</h1>
    <form id="diagform" @submit.prevent="login">
      <table>
        <tr>
          <td>host:</td>
          <td>{{ host }}</td>
        </tr>
        <tr>
          <td>downlink:</td>
          <td>{{ downlink }}</td>
        </tr>
        <tr>
          <td>product:</td>
          <td>{{ product }}</td>
        </tr>
        <tr>
          <td>appName:</td>
          <td>{{ appName }}</td>
        </tr>
        <tr>
          <td>onLine:</td>
          <td>{{ onLine }}</td>
        </tr>
        <tr>
          <td>deviceMemory:</td>
          <td>{{ deviceMemory }}</td>
        </tr>
        <tr>
          <td>hardwareConcurrency:</td>
          <td>{{ hardwareConcurrency }}</td>
        </tr>
      </table>
      <p v-for="err in errors" :key="err" class="error">{{ err }}</p>
    </form>
  </div>
</template>

<script>
export default {
  name: "Diag",
  components: {},
  mixins: [],
  data() {
    return {
      errors: [],
      host: window.location.host,
      downlink: navigator.connection.downlink,
      product: navigator.product,
      appName: navigator.appName,
      onLine: navigator.onLine,
      deviceMemory: navigator.deviceMemory,
      hardwareConcurrency: navigator.hardwareConcurrency,
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  computed: {},
  methods: {
    loadData() {
      if (this.provincesData !== null) return
      console.log("here")
      this.$bypropAPI
        .province()
        .then((res) => {
          this.provincesData = res.data
        })
        .catch(() => {
          this.errors = ["province API Error"]
        })
    },
    loadCountiesData(selectedIndex) {
      let provinceId = this.provincesData[selectedIndex].id
      this.$bypropAPI
        .county(provinceId)
        .then((res) => {
          this.countiesData = res.data
        })
        .catch(() => {
          this.errors = ["county API Error"]
        })
    },
    clearVals() {
      this.emailErr = null
      this.passErr = null
      this.errors = []
    },
    closeModal() {
      this.$emit("exitModal")
    },
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {
    this.clearVals()
  },
}
</script>

<style lang="scss" scoped>
#loginform {
  max-width: 400px;
}

#submitbutton {
  margin-top: 9px;
  margin-bottom: 9px;
}

.error {
  color: red;
  font-size: 0.8em;
}
</style>
