<template>
  <section>
    <div
      class="validation"
      :class="validationStyle">{{ validationText }}
    </div>
    <div class="editor">
      <div
        class="input-editor"
        :style="{ height: !showErrorsEditor ? 'calc(100% - 2em)' : '80%' }"
      >
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
      <div
        class="errors-editor"
        :style="{ height: !showErrorsEditor ? '1em' : '20%' }">
        <div class="errors-header">
          <span>Errors</span>
          <div class="errors-toolbar">
            <span
              class="errors-toggle"
              @click="showErrorsEditor = !showErrorsEditor">
              <svg
                v-show="!showErrorsEditor"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24">
                <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>
                <path
                  d="M0 0h24v24H0z"
                  fill="none"/>
              </svg>
              <svg
                v-show="showErrorsEditor"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24">
                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
                <path
                  d="M0 0h24v24H0z"
                  fill="none"/>
              </svg>

            </span>
          </div>
        </div>
        <editor
          v-model="errors"
          @init="editorInit"
          lang="json"
          theme="chrome"
          width="100%"
          height="100%"
          :options="options"
        />
      </div>
    </div>
  </section>
</template>

<script>

const Ajv = require('ajv')

const stubData = JSON.stringify({ name: 'something', account: '12345', tax: '12345', type: 'product' }, null, 2)

export default {
  components: {
    'editor': require('vue2-ace-editor')
  },
  data () {
    return {
      content: stubData,
      checking: true,
      valid: null,
      errors: '',
      validationText: 'checking...',
      validationStyle: { 'checking': true },
      options: {
        tabSize: 2,
        useSoftTabs: true
      },
      schema: null,
      validate: null,
      ajv: null,
      showErrorsEditor: true
    }
  },
  beforeMount () {
    this.$root.$on('schema', (schema) => {
      let parsedSchema
      try {
        parsedSchema = JSON.parse(schema)
      } catch (err) {
        return console.error(err)
      }
      this.ajv = new Ajv()
      this.schema = schema
      this.validate = this.ajv.compile(parsedSchema)
    })
  },
  watch: {
    content (newValue, oldValue) {
      let d
      try {
        d = JSON.parse(newValue)
      } catch (err) {
        this.valid = false
        this.validationText = 'could not parse input'
        this.validationStyle = { 'no-parse': true }
        return
      }
      this.valid = this.validate(d)

      if (this.validate.errors) {
        try {
          this.errors = JSON.stringify(this.validate.errors, null, 2)
        } catch (err) {
          this.errors = 'could not parse errors'
        }
      } else {
        this.errors = ''
      }

      if (this.valid) {
        this.validationText = 'is valid'
        this.validationStyle = { 'valid': true }
      } else {
        this.validationText = 'is invalid'
        this.validationStyle = { 'invalid': true }
      }
    }

    // if (this.valid) return { 'valid': true }
    // if (!this.checking && !this.valid) return { 'invalid': true }
    // if (this.checking) return { 'checking': true }
    // return { 'no-input': true }
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
    }
  }
}
</script>

<style scoped>
section {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.editor {
  /* height: 100%; */
  /* overflow: scroll; */
  flex: 1;
}

.input-editor {
  display: flex;
}

.input-editor > * {
  flex: 1;
}

.errors-editor {
  display: flex;
  flex-direction: column;
}

.input-editor > * {
  flex: 1;
}

.errors {
  overflow-y: scroll;
  overflow-x: hidden;
}

.validation, .errors-header {
  width: 100%;
  min-height: 1em;
  max-height: 1em;
  flex-basis: 1em;
  padding: 1em;
  font-size: 1em;
  display: flex;
  align-items: center;
  font-size: 1em;
  border: none;
  border: 1px solid transparent;
  border-top: 1px solid #DDD;
  border-bottom: 1px solid #DDD;
  border-left: 1px solid #DDD;
  /* border-bottom: 1px solid #DDD; */
  box-sizing: border-box;
}

.errors-header {
  display: flex;
  justify-content: space-between;
}

.validation.checking {
  background-color: coral;
  color: white;
}

.validation.invalid {
  background-color:red;
  color: white;
}

.validation.no-input {
  background-color:rgb(17, 0, 255);
  color: white;
}

.validation.no-parse {
  background-color:rgb(119, 7, 7);
  color: white;
}

.validation.valid {
  background-color:green;
  color: white;
}
</style>
