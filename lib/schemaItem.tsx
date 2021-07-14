import { defineComponent, inject, Ref, ref } from "vue";
import { SchemaType } from "./types";
import StringField from "./fields/stringField";
import NumberField from "./fields/numberField";
import ObjectField from "./fields/objectField";
export default defineComponent({
  name: "SchemaItem",
  components: {
    StringField,
    NumberField,
    ObjectField,
  },
  setup() {
    const schema: Ref<{ type: string }> = inject(
      "schema",
      ref({ type: "string" })
    );
    return () => {
      const { type: schemaType } = schema.value;
      let inputComponent;
      switch (schemaType) {
        case SchemaType.STRING:
          inputComponent = <StringField></StringField>;
          break;
        case SchemaType.NUMBER:
          inputComponent = <NumberField></NumberField>;
          break;
        case SchemaType.OBJECT:
          inputComponent = <ObjectField></ObjectField>;
          break;
        default:
          console.log("schemaType error");
          break;
      }
      return <div>{inputComponent}</div>;
    };
  },
});
