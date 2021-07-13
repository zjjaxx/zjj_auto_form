import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "NumberFiled",
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
  },
  emit: ["update:modelValue"],
  setup(props, { emit }) {
    const value = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", parseInt(value as string));
      },
    });
    return () => {
      return <input type="number" v-model={value.value} />;
    };
  },
});
