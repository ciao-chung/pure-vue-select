<template>
  <div tabindex="0" data-role="dropdown-select-wrap" v-if="render"
    @focus="open()" @blur="close()" :class="{ disabled: disabled }" :select-style="color">

    <span v-for="item in value" class="selected-tag">
      {{ optionsModel[item].value }}
      <i class="fa fa-close remove-btn" @mousedown.prevent="select(item)"></i>
    </span>
    <input data-role="dropdown-select" class="form-control" type="text"
      @focus="open()" @blur="close()" v-model="keyword"/>
    <i class="icon" :class="setIcon()"></i>

    <ul class="options" :class="{ active: isOpen }" :style="optionStyle">
      <li v-for="option in filterBy(options, keyword, labelKey, valueKey)">
        <a @mousedown.prevent="select(option[valueKey])"
          :class="{ active: optionsModel[option[valueKey]].selected}">{{ option[labelKey] }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
module.exports = {
  props: {
    options: {
      type: Array,
      default: [],
    },
    labelKey: {
      default: 'label',
    },
    valueKey: {
      default: 'value',
    },
    value: {
      type: Array,
      default: []
    },
    max: {
      type: Number,
      default: null
    },
    optionStyle: {
      type: Object,
      default: function () {
        return {}
      },
    },
    color: {
      type: String,
      default: 'blue'
    },
  },
  data: function () {
    return {
      isOpen: false,
      render: false,
      optionsModel: {},
      localValue: [],
      disabled: false,
      keyword: null,
    }
  },
  created: function () {
    this.init()
  },
  methods: {
    init: function () {
      this.optionsModel = {}
      this.render = false
      this.localValue = []
      this.keyword = null
      if(this.options.length == 0) return
      if(this.value == null || this.value == undefined) return
      for(let option of this.options) {
        this.optionsModel[option[this.valueKey]] = {}
        this.optionsModel[option[this.valueKey]].value = option[this.labelKey]
        this.optionsModel[option[this.valueKey]].selected = false
      }
      this.bind()
      if(this.max <= this.localValue.length && this.max != null && this.max != undefined) {
        this.disabled = true
      }
      else {
        this.disabled = false
      }
      this.render = true
    },
    open: function () {
      this.isOpen = true
    },
    close: function () {
      this.isOpen = false
    },
    setIcon: function () {
      if(this.isOpen) return 'fa fa-chevron-down'
      return 'fa fa-chevron-up'
    },
    bind: function() {
      this.localValue = this.value
      if(this.localValue == null || this.localValue == undefined) return
      for(const value of this.value) {
        this.optionsModel[value].selected = true
        this.$set(this.optionsModel[value], 'selected', true)
      }
    },
    select: function (value) {
      const newStatus = !this.optionsModel[value].selected
      if(this.disabled && newStatus) return
      this.optionsModel[value].selected = newStatus
      this.$set(this.optionsModel[value], 'selected', newStatus)
      if(newStatus) {
        this.localValue.push(value)
        return
      }
      else {
        for(const index in this.localValue) {
          if(this.localValue[index] == value) {
            this.localValue.splice(index, 1)
          }
        }
        return
      }
    },
  },
  watch: {
    optionsModel: {
      deep: true,
      handler: function() {
      },
    },
    value: {
      deep: true,
      handler: function () {
        this.init()
      },
    },
  },
}
</script>

<style lang="sass" type="text/sass" scoped>
@mixin transition ($property, $time, $style)
  transition: $property $time $style
  -webkit-transition: $property $time $style
  -moz-transition: $property $time $style
  -o-transition: $property $time $style
  -ms-transition: $property $time $style
@mixin fadeToggle ($time)
  opacity: 0
  pointer-events: none
  max-height: 0
  @include transition(all, $time, ease-out)
  &.active
    opacity: 1
    max-height: 100vh
    pointer-events: auto
    @include transition(all, $time, ease-in)
$configs: ('blue': #5bc0de, 'green': #62ce62, 'orange': #f0ad4e, 'red': #d9534f)
$select-color: #ccc
$option-text-color: lighten(#333, 15%)
$selected-color: #e6e6e6
@each $config, $style-color in $configs
  div[data-role="dropdown-select-wrap"][select-style="#{$config}"]
    display: inline-block
    width: 100%
    position: relative
    border: 1px $selected-color solid
    outline: none
    min-height: 40px
    cursor: pointer
    *[data-role="dropdown-select"]
      margin: 0
      background-color: white
      height: 36px
      width: 100%
      cursor: pointer
      &, &:focus, &:active, &:hover
        border: none
        outline: none
        box-shadow: none
        // border-top: 1px $selected-color solid
        border-radius: 0
    .icon
      position: absolute
      right: 10px
      bottom: 10px
      color: darken($select-color, 10%)
    .options
      @include fadeToggle(0.5s)
      z-index: 1
      background-color: white
      position: absolute
      width: 100%
      top: 100%
      list-style: none
      padding: 10px 0 10px 0
      border: 1px $select-color solid
      border-top: none
      border-radius: 0 0 5px 5px
      height: 200px
      overflow-y: auto
      li
        margin: 5px 0
        a
          font-size: 14px
          color: $option-text-color
          text-decoration: none
          display: block
          cursor: pointer
          padding: 5px 10px
          &:hover
            background-color: $style-color
            color: white
          &.active
            color: $option-text-color
            background-color: $selected-color
    .selected-tag
      padding: 5px
      margin: 5px
      display: inline-block
      color: white
      background-color: $style-color
      .remove-btn
        cursor: pointer
    &.disabled
      .options
        cursor: not-allowed
        a
          cursor: not-allowed
</style>
