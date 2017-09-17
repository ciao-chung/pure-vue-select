# ciao-vue-select
> Pure Vue.js Select


## Dependencies

* Vue 2.x
* Vue2-Filters
* Bootstrap 3.x
* Font-Awesome 4.x

## Feature

* Searchable
* Customizable property name
* Can limit data amount

## Install

```bash
yarn install ciao-vue-select
```

## Usage

**Template**

```html
<form-select :options="options" v-model="value"></form-select>
```

**Vue**

```javascript
import ciaoVueSelect from 'ciao-vue-select'
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
```

## Style

> You can choice select style by using prop `color`.
>
> There has 4 style can use (blue, green, orange, red).
>
> Blue is default style.

**Example**

```html
<form-select :options="options" v-model="value" :color="'orange'"></form-select>
```

## Limit max

> You can limit data amount by using prop `max`.

**Example**

```html
<form-select :options="options" v-model="value" :max="3"></form-select>
```

## Use specify property name

> You can use specify label's or value's property name

**Template**

```html
<form-select :options="options" v-model="value" :labelKey="'name'" :valueKey="'id'"></form-select>
```

**Data**

```javascript
data: function() {
  return {
   value: ['javascript', 'vue', 'css'],
   options: [
     { name: 'HTML', id: 'html' },
     { name: 'CSS', id: 'css' },
     { name: 'SASS', id: 'sass' },
     { name: 'Bootstrap', id: 'bootstrap' },
     { name: 'JavaScript', id: 'javascript' },
     { name: 'Vue.js', id: 'vue' },
     { name: 'Yarn', id: 'yarn' },
     { name: 'Webpack', id: 'webpack' }
   ]
  }
},
```
