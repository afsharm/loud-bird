<template>
  <div>
    <h1 class="title has-text-centered">Register a load</h1>
    <form id="provinceform" @submit.prevent="login">
      <b-field label="Province">
        <select
          @click="loadData"
          @change="loadCountiesData($event.target.selectedIndex)"
        >
          <option v-for="p in provincesData" :key="p.id">
            {{ p.name }}
          </option>
        </select>
      </b-field>
      <b-field label="County">
        <select>
          <option v-for="c in countiesData" :key="c.id">
            {{ c.name }}
          </option>
        </select>
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
  name: "Provinceform",
  components: {},
  mixins: [],
  data() {
    return {
      errors: [],
      provincesData: null,
      countiesData: null,
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
