<template>
  <div class="c_multiselect">
    <multiselect
      v-bind="$props"
      v-model="value"
      :hideSelected="true"
      :internal-search="isSearchable"
      label="label"
      :limit="10"
      :loading="isLoading"
      :multiple="isMulti"
      :options="options"
      :options-limit="10"
      :placeholder="placeholder"
      :searchable="isSearchable"
      track-by="id"
      @search-change="$emit('search-change', $event)"
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
    emits: ['update:modelValue', 'search-change'],
    props: {
      id: {
        required: true,
        type: String,
      },
      isLoading: {
        default() {
          return false;
        },
        type: Boolean,
      },
      isMulti: {
        default() {
          return false;
        },
        type: Boolean,
      },
      isSearchable: {
        default() {
          return false;
        },
        type: Boolean,
      },
      modelValue: {
        default() {
          return null;
        },
        type: [Array, Object],
      },
      options: {
        required: true,
        type: Array,
      },
      placeholder: String,
    },
    computed: {
      value: {
        get() {
          return this.modelValue;
        },
        set(value) {
          this.$emit('update:modelValue', value);
        },
      },
    },
  };
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style lang="scss" scoped>
  .c_multiselect {
    flex-grow: 1;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    display: flex;

    &:deep(.multiselect__tag) {
      background: var(--primary);
    }

    &:deep(.multiselect__tag-icon) {
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

    &:deep(.multiselect__option--highlight) {
      background: var(--primary);
    }

    &:deep(.multiselect__option--highlight::after) {
      background: var(--primary);
    }
  }
</style>
