import { defineComponent, PropType } from "vue";
// import SchemaFormStyle from "./schemaForm.less";
export default defineComponent({
  name: "SchemaForm",
  props: {
    schema: {
      type: Object as PropType<Schema>,
    },
  },
  setup(props) {
    return () => {
      const schema = props.schema;
      console.log("schema is", schema);
      return <div></div>;
    };
  },
});
