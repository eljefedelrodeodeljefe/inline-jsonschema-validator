<template>
  <div
    :style="{ height }"
    class="inline-jsonschema-validator"
  >
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
    },
    height: {
      type: String,
      default: '100%'
    }
  }
}
</script>

<style scoped>
.inline-jsonschema-validator {
  display: flex;
  flex-direction: row;
  width: 100%;
  flex: 1;
  margin: 0;
  overflow: hidden;
}

.inline-jsonschema-validator > * {
  width: 50%;
  height: 100%;
}
</style>
