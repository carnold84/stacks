<template>
  <div :class="['c_text_field']">
    <slot name="icon" />
    <div class="content">
      <label v-if="label" :for="id">
        {{ `${label}${isRequired ? '*' : ''}` }}
      </label>
      <textarea
        v-if="type === 'textarea'"
        v-model="inputVal"
        @blur="onBlur"
        @focus="onFocus"
        class="field"
        :id="id"
        :placeholder="placeholder"
      />
      <input
        v-else
        v-model="inputVal"
        @blur="onBlur"
        @focus="onFocus"
        class="field"
        :id="id"
        :placeholder="placeholder"
        :type="type"
      />
      <span v-if="error" class="error">
        {{ error }}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CTextField',
    data() {
      return {
        error: null,
        touched: false,
      };
    },
    props: {
      id: {
        required: true,
        type: String,
      },
      isLarge: {
        default() {
          return false;
        },
        type: Boolean,
      },
      isRequired: {
        default() {
          return false;
        },
        type: Boolean,
      },
      label: String,
      placeholder: String,
      type: {
        default() {
          return 'text';
        },
        type: String,
      },
      value: {
        default() {
          return '';
        },
        type: String,
      },
    },
    methods: {
      onBlur() {
        this.validate();

        this.$emit('blur');
      },
      onFocus() {
        if (!this.touched) {
          this.touched = true;
        }

        this.$emit('focus');
      },
      validate() {
        let isValid = true;

        if (this.touched) {
          if (this.isRequired && this.inputVal === '') {
            this.error = this.label
              ? `${this.label} is required`
              : 'Field is required';
            isValid = false;
          } else {
            this.error = null;
          }
        }

        this.isValid = isValid;
      },
    },
    computed: {
      inputVal: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit('input', val);
        },
      },
    },
    watch: {
      value() {
        // validate input when passed into to check if it's blank
        this.validate();
      },
    },
  };
</script>

<style scoped>
  .c_text_field {
    display: flex;
  }

  .c_text_field /deep/ svg {
    fill: var(--c_textField_icon_fill);
    height: 20px;
    margin: 5px 10px 0 0;
    width: 20px;
  }

  .c_text_field .content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .c_text_field label {
    color: var(--c_textField_label_color);
    font-size: 1.3rem;
    font-weight: 300;
    margin: 0 0 4px;
  }

  .c_text_field .field {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid var(--c_textField_field_borderColor);
    color: var(--c_textField_field_color);
    font-family: inherit;
    font-size: 1.4rem;
    margin: 0;
    padding: 7px 0;
  }

  .c_text_field.is_large .field {
    font-size: 2rem;
  }

  .c_text_field textarea.field {
    flex-grow: 1;
    min-height: 90px;
  }

  .c_text_field .field:focus {
    border-bottom: 1px solid var(--c_textField_field_borderColor__focus);
    outline: none;
  }

  .c_text_field .error {
    color: var(--c_textField_error_color);
    font-size: 1.4rem;
    font-weight: 300;
    margin: 5px 0 0;
  }
</style>
