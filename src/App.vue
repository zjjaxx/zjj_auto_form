<template>
  <div class="app-container">
    <div class="aside">
      <div class="tab">
        <button
          :class="['button', schemaIndexRef == index ? 'button-active' : '']"
          v-for="(item, index) in demos"
          :key="item.name"
          @click="schemaIndexRef = index"
        >
          {{ item.name }}
        </button>
      </div>
      <monacoEditor
        class="edit"
        :code="schemaDemo.schemaCode"
        :onChange="handleSchemaChange"
        title="Schema"
      ></monacoEditor>
      <div class="bottom-wrapper">
        <monacoEditor
          class="bottom-item"
          :code="schemaDemo.uiSchemaCode"
          :onChange="handleUISchemaChange"
          title="UISchema"
        ></monacoEditor>
        <monacoEditor
          class="bottom-item"
          :code="schemaDemo.dataCode"
          :onChange="handleDataChange"
          title="Value"
        ></monacoEditor>
      </div>
    </div>
    <div class="main">
      <SchemaForm
        :schema="schemaDemo.schema"
        v-model="schemaDemo.data"
      ></SchemaForm>
    </div>
  </div>
</template>

<script lang="ts">
import * as monaco from "monaco-editor";
import monacoEditor from "./components/monacoEditor";
import { defineComponent, ref, reactive, watchEffect, watch } from "vue";
import SchemaForm from "../lib/schemaForm";
import demos from "./demos/index";
function toJson(data: any) {
  return JSON.stringify(data, null, 2);
}
// TODO: 在lib中export
type Schema = any;
type UISchema = any;
export default defineComponent({
  components: {
    SchemaForm,
    monacoEditor,
  },
  setup() {
    const schemaIndexRef = ref(0);
    const schemaDemo: {
      schema: Schema | null;
      data: any;
      uiSchema: UISchema | null;
      schemaCode: string;
      dataCode: string;
      uiSchemaCode: string;
      customValidate: ((d: any, e: any) => void) | undefined;
      [key: string]: any;
    } = reactive({
      schema: null,
      data: {},
      uiSchema: {},
      schemaCode: "",
      dataCode: "",
      uiSchemaCode: "",
      customValidate: undefined,
    });
    watchEffect(() => {
      let _demo_item = demos[schemaIndexRef.value];
      schemaDemo.schema = _demo_item.schema;
      schemaDemo.data = _demo_item.default;
      schemaDemo.uiSchema = _demo_item.uiSchema;
      schemaDemo.schemaCode = toJson(_demo_item.schema);
      schemaDemo.dataCode = toJson(_demo_item.default);
      schemaDemo.uiSchemaCode = toJson(_demo_item.uiSchema);
      if ("customValidate" in _demo_item) {
        schemaDemo.customValidate = (_demo_item as any).customValidate;
      }
    });

    watch(
      () => schemaDemo.data,
      (newValue) => {
        schemaDemo.data = newValue;
        schemaDemo.dataCode = toJson(newValue);
      }
    );
    const handleChange = (
      key: "schema" | "data" | "uiSchema",
      value: string,
      event: monaco.editor.IModelContentChangedEvent
    ) => {
      try {
        schemaDemo[key] = JSON.parse(value);
        schemaDemo[key + "Code"] = value;
      } catch (error) {
        console.log("error is", error);
      }
    };
    const handleSchemaChange = (
      v: string,
      event: monaco.editor.IModelContentChangedEvent
    ) => handleChange("schema", v, event);
    const handleDataChange = (
      v: string,
      event: monaco.editor.IModelContentChangedEvent
    ) => handleChange("data", v, event);
    const handleUISchemaChange = (
      v: string,
      event: monaco.editor.IModelContentChangedEvent
    ) => handleChange("uiSchema", v, event);
    return {
      demos,
      schemaIndexRef,
      schemaDemo,
      handleSchemaChange,
      handleDataChange,
      handleUISchemaChange,
    };
  },
});
</script>

<style lang="less">
.app-container {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 1200px;
  .edit {
    width: 700px;
    height: 400px;
  }
  .tab {
    margin-bottom: 10px;
    .button {
      margin-right: 10px;
      appearance: none;
      border-width: 0;
      background-color: transparent;
      cursor: pointer;
      display: inline-block;
      padding: 15px;
      border-radius: 5px;
      &:hover {
        background: #efefef;
      }
    }
    .button-active {
      background: #337ab7;
      color: #fff;
      &:hover {
        background: #337ab7;
      }
    }
  }
  .bottom-wrapper {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .bottom-item {
      width: 320px;
      height: 400px;
    }
  }
  .main {
    padding-top: 55px;
    width: 400px;
  }
}
</style>
