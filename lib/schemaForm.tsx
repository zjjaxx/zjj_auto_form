import { computed, defineComponent, PropType, toRefs, provide } from "vue";
import { Schema, SchemaKey, updateModelValueKey, modelValueKey } from "./types";
import SchemaItem from "./schemaItem";
import { retrieveSchema } from "./utils";
// import SchemaFormStyle from "./schemaForm.less";
export default defineComponent({
  name: "SchemaForm",
  components: {
    SchemaItem,
  },
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
    const { schema, modelValue } = toRefs(props);
    const updateModelValue = (value: any) => {
      emit("update:modelValue", value);
    };
    provide(SchemaKey, schema);
    provide(modelValueKey, modelValue);
    provide(updateModelValueKey, updateModelValue);
    const retrieveSchemaRef = computed(() => {
      return retrieveSchema(props.schema, props.schema, props.modelValue);
    });
    return () => {
      return <SchemaItem></SchemaItem>;
    };
  },
});
