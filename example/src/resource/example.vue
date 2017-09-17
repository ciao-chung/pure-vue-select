<template>
  <div>

    <form-select :options="options" v-model="value"></form-select>
  </div>
</template>

<script>
import ciaoVueSelect from '../../../index.js'
export default {
  data: function() {
    return {
      value: ['javascript', 'vue', 'css'],
      options: [
        { label: 'HTML', value: 'html' },
        { label: 'CSS', value: 'css' },
        { label: 'SASS', value: 'sass' },
        { label: 'Bootstrap', value: 'bootstrap' },
        { label: 'JavaScript', value: 'javascript' },
        { label: 'Vue.js', value: 'vue' },
        { label: 'Yarn', value: 'yarn' },
        { label: 'Webpack', value: 'webpack' }
      ]
    }
  },
  components: {
    'form-select': ciaoVueSelect
  }
}
</script>
