import { defineComponent, computed, inject, ref, Ref } from "vue";

export default defineComponent({
  name: "NumberFiled",
  setup() {
    const modelValue: Ref<number> = inject("modelValue", ref(0));
    const updateModelValue = inject(
      "updateModelValue",
      (v: number) => undefined
    );
    const value = computed({
      get() {
        return modelValue.value;
      },
      set(value) {
        updateModelValue(parseInt(value as string) as number);
      },
    });
    return () => {
      return <input type="number" v-model={value.value} />;
    };
  },
});
