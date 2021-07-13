import { computed, defineComponent, PropType } from "vue";
import { SchemaType, Schema } from "./types";
import StringField from "./fields/stringField";
import NumberField from "./fields/numberField";
// import SchemaFormStyle from "./schemaForm.less";
export default defineComponent({
  name: "SchemaForm",
  components: { NumberField, StringField },
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    modelValue: {
      required: true,
    },
  },
  emit: ["update:modelValue"],
  setup(props, { emit }) {
    const schemaValue = computed({
      get() {
        return props.modelValue;
      },
      set(value: any) {
        emit("update:modelValue", value);
      },
    });
    return () => {
      const {
        schema: { type: schemaType },
      } = props;
      let inputComponent;
      switch (schemaType) {
        case SchemaType.STRING:
          inputComponent = (
            // @ts-ignore
            <StringField v-model={schemaValue.value}></StringField>
          );
          break;
        case SchemaType.NUMBER:
          inputComponent = (
            // @ts-ignore
            <NumberField v-model={schemaValue.value}></NumberField>
          );
          break;
        default:
          console.log("schemaType error");
          break;
      }

      return <div>{inputComponent}</div>;
    };
  },
});
