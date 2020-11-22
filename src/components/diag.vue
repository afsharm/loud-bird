<template>
  <div>
    <h1 class="title has-text-centered">Diag</h1>
    <form id="diagform" @submit.prevent="login">
      <b-field label="base_url">
        <span>{{ baseURL }}</span>
      </b-field>
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
      baseURL: `${process.env.BASE_URL}`,
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
