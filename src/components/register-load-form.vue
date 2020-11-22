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
    async loadData() {
      let res = this.load_internal()

      if (res === null) {
        let res = await this.$bypropAPI.all_county()
        localStorage.setItem("counties", JSON.stringify(res.data))
        localStorage.setItem("counties_time", new Date())
        res = res.data
      }

      this.all_county = res
      this.provincesData = this.all_county.provinces
    },
    load_internal() {
      let counties_time_obj = localStorage.getItem("counties_time")

      if (counties_time_obj === null) return null

      let counties_time = new Date(counties_time_obj)
      let diff_ms = new Date() - counties_time
      let diff_min = diff_ms / 60000
      let counties_obj = localStorage.getItem("counties")

      if (counties_obj === null) return null

      let counties = JSON.parse(counties_obj)
      let validity = counties.validity

      if (diff_min > validity) return null

      return counties
    },
    loadCountiesData(selectedIndex) {
      let provinceId = this.provincesData[selectedIndex].id
      this.countiesData = this.all_county.counties.filter(
        (x) => x.province === provinceId
      )
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
