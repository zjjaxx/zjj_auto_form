import { computed, defineComponent, inject, Ref, ref } from "vue";

export default defineComponent({
  name: "StringField",
  setup() {
    const modelValue: Ref<string> = inject("modelValue", ref(""));
    const updateModelValue = inject(
      "updateModelValue",
      (v: string) => undefined
    );
    const value = computed({
      get() {
        return modelValue.value;
      },
      set(value) {
        updateModelValue(value as string);
      },
    });
    return () => {
      return <input type="text" v-model={value.value} />;
    };
  },
});
