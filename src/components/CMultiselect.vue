<template>
  <div class="c_multiselect">
    <multiselect
      v-model="inputVal"
      :customLabel="label"
      :hideSelected="true"
      :options="options"
      :multiple="isMulti"
      :placeholder="placeholder"
      track-by="id"
    />
  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect';

  export default {
    name: 'CMultiselect',
    components: {
      Multiselect,
    },
    props: {
      isMulti: {
        type: Boolean,
        default: false,
      },
      options: {
        type: Array,
        required: true,
      },
      placeholder: String,
      value: {
        required: true,
        type: [Array, Object],
      },
    },
    updated() {
      console.log(this.options);
    },
    computed: {
      inputVal: {
        get() {
          console.log('get', this.value);
          return this.value;
        },
        set(val) {
          console.log('set', this.val);
          this.$emit('input', val);
        },
      },
    },
    methods: {
      label(item) {
        return item.label;
      },
    },
  };
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
  .c_multiselect {
    flex-grow: 1;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    display: flex;
  }
</style>
<style lang="scss">
  .multiselect__tag {
    background: var(--primary);
  }
  .multiselect__tag-icon {
    &:focus {
      background: var(--primary);
    }
    &:hover {
      background: var(--primary__HOVER);
    }
    &:after {
      color: #ffffff;
    }
  }
  .multiselect__option--highlight {
    background: var(--primary);
  }
  .multiselect__option--highlight::after {
    background: var(--primary);
  }
</style>
