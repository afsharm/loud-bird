<template>
  <div>
    <h1 class="title has-text-centered">Province/County</h1>
    <form id="loginform" @submit.prevent="login">
      <b-field label="Province">
        <FormulateInput
          id="province"
          v-model="emailAddress"
          type="select"
          name="province"
          placeholder="Select province"
          :options="provincesData"
          @click="loadData"
          @change="loadCountiesData"
        />
      </b-field>
      <b-field label="County">
        <FormulateInput
          v-model="emailAddress"
          type="select"
          name="county"
          placeholder="Select county"
          :options="countiesData"
        />
      </b-field>

      <p v-for="err in errors" :key="err" class="error">{{ err }}</p>

      <p class="control">
        <button id="submitbutton" class="button is-primary">Submit</button>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: "Loginform",
  components: {},
  // props: [],
  mixins: [],
  data() {
    return {
      emailAddress: null,
      password: null,
      errors: [],
      provincesData: [
        { value: 1, label: "Teh" },
        { value: 2, label: "Sem" },
        { value: 3, label: "Maz" },
      ],
      countiesData: null,
      province: null,
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  computed: {},
  methods: {
    loadData() {
      //console.log("hello-vue")
      this.$bypropAPI
        .province()
        .then((res) => {
          //console.log("res " + res.data)
          this.provincesData = res.data.map(function (item) {
            return { value: item.id, label: item.name }
          })
        })
        .catch(() => {
          this.errors = ["province API Error"]
        })
    },
    loadCountiesData() {
      let provinceId = this.province
      console.log("loadCountiesData " + provinceId)
      this.$bypropAPI
        .county(provinceId)
        .then((res) => {
          console.log("res " + res.data)
          this.countiesData = res.data.map(function (item) {
            return { value: item.id, label: item.name }
          })
        })
        .catch(() => {
          this.errors = ["county API Error"]
        })
    },
    login() {
      const cleanData = this.$accountAPI.cleanData({
        emailAddress: this.emailAddress,
        password: this.password,
      })

      if (cleanData.errors.length >= 1) {
        this.errors = cleanData.errors
        return
      }
      this.errors = []
      this.$accountAPI
        .login(cleanData)
        .then(() => {
          this.$buefy.toast.open({
            duration: 2000,
            message: "Login Successful",
            position: "is-top",
            type: "is-success",
          })
          this.$emit("exitModal", cleanData)

          if (this.$router.currentRoute.path === "/login") {
            this.$router.push("/")
          }
        })
        .catch(() => {
          this.errors = ["Incorrect email or password"]
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
