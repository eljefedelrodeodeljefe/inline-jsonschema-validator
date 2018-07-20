<template>
  <div class="inline-jsonschema-validator">
    <schema
      class="left"
      :style="{ width: inputActive ? '50%': '100%' }"
      :schema-url="schemaUrl"
    />
    <object-input
      v-show="inputActive"
      class="right"/>
  </div>
</template>

<script>
import Schema from './components/Schema.vue'
import ObjectInput from './components/ObjectInput.vue'

export default {
  data () {
    return {
      inputActive: false
    }
  },
  mounted () {
    this.$root.$on('toggle-input', () => {
      this.inputActive = !this.inputActive
    })
  },
  name: 'InlineJSONschemaValidator',
  components: {
    Schema,
    ObjectInput
  },
  props: {
    schemaUrl: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.inline-jsonschema-validator {
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-grow: 1;
  margin: 0;
  height: 100%;
}

.inline-jsonschema-validator > * {
  width: 50%;
  height: 100%;
}
</style>
