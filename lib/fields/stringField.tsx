import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "StringField",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emit: ["update:modelValue"],
  setup(props, { emit }) {
    const value = computed({
      get() {
        return props.modelValue;
      },
      set(value: any) {
        emit("update:modelValue", value);
      },
    });
    return () => {
      return <input type="text" v-model={value.value} />;
    };
  },
});
