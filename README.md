# inline-jsonschema-validator

> Display and do validation on JSON Schemas in the browser or as library on your site.

This library uses [Ajv](https://github.com/epoberezkin/ajv) for convient validation of JSON Schemas. You can for example embed it into your your own documentation or website to have your schemas more accessible to consumers.

## Getting Started

```bash
npm install inline-jsonschema-validator
```

### Via NPM

```js
<template>
  <ijv schema-url="https://foo.bar/schema.json"/>
</template>

<script>
import ijv from 'inline-jsonschema-validator'

export default {
  components: {
    ijv
  }
}
</script>

<style scoped>
@import "inline-jsonschema-validator/dist/inlineJSONSchemaValidator.css";
</style>
```

### Via Script Tag
