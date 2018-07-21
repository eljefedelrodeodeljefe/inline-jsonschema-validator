<template>
  <section>
    <div class="toolbar">
      <input
        class="url-input"
        :class="{ 'loading': loading, 'loaded': loaded, 'errored': errored }"
        v-model="url"
        placeholder="URL">
      <div class="toggles">
        <span @click="getSchema">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24">
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
            <path
              d="M0 0h24v24H0z"
              fill="none"/>
          </svg>
        </span>
        <span @click="$root.$emit('toggle-input')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24">
            <path
              d="M0 0h24v24H0z"
              fill="none"/>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>

        </span>
      </div>
    </div>
    <div class="editor">
      <editor
        v-model="content"
        @init="editorInit"
        lang="json"
        theme="chrome"
        width="100%"
        height="100%"
        :options="options"
      />
    </div>
  </section>
</template>

<script>
const axios = require('axios')

export default {
  components: {
    'editor': require('vue2-ace-editor')
  },
  data () {
    const initialUrl = this.schemaUrl
    return {
      content: '',
      url: initialUrl,
      options: {
        tabSize: 2,
        useSoftTabs: true
      },
      loading: false,
      errored: null,
      loaded: null
    }
  },
  mounted () {
    this.getSchema()
  },
  props: {
    schemaUrl: {
      type: String,
      default: ''
    }
  },
  methods: {
    editorInit: function () {
      require('brace/ext/language_tools') // language extension prerequsite...
      require('brace/mode/javascript') // language
      require('brace/mode/json') // language
      require('brace/mode/less')
      require('brace/theme/chrome')
      require('brace/snippets/javascript') // snippet
      require('brace/snippets/json') // snippet
    },
    getSchema () {
      if (!this.url) return this.setExampleSchema()

      this.loading = true
      axios.get(this.url)
        .then((response) => {
          this.loading = false
          const schema = JSON.stringify(response.data, null, 2) + '\n'
          this.content = schema
          this.$root.$emit('schema', schema)
          this.loaded = true
          setTimeout(() => {
            this.loaded = null
          }, 150)
        })
        .catch((error) => {
          this.loading = false
          this.errored = true

          setTimeout(() => {
            this.errored = null
          }, 150)
          // handle error
          console.error(error)
        })
    },
    setExampleSchema () {
      const schema = JSON.stringify({ additionalProperties: false, type: 'object', required: ['amount'], properties: { amount: { type: 'number' } } }, null, 2) + '\n'
      this.content = schema
      this.$nextTick(() => {
        this.$root.$emit('schema', schema)
      })
    }
  }
}
</script>

<style scoped>
section {
  height: 100%;
}

.editor {
  height: calc(100% - 1em);
}

.toolbar {
  position: relative;
  max-width: 100%;
}

.toolbar > .toggles {
  right: 0.1em;
  top: 0.3em;
  position: absolute
}

.toolbar > .toggles > * {
  padding-left: 0em;
}

.url-input {
  width: 100%;
  min-height: 1em;
  max-height: 1em;
  padding : 1em;
  font-size: 1em;
  border: none;
  border: 1px solid transparent;
  border-top: none;
  border-bottom: 1px solid #DDD;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

/* .loading {
  background-color: coral;
} */

.loaded {
  transition: all 1s ease-out;
  background-color: green;
}
.errored {
  transition: all 1s ease-out;
  background-color: red;
}

</style>
