<template>
  <vue-bpmn
    @selectChange="selectionChangeHandler"
    @remove:shape="removeHandler"
  >
    <form-a :ruleForm="ruleForm" />
  </vue-bpmn>
</template>

<script lang="ts">
import VueBpmn from "./bpmn.vue";
import { computed, defineComponent, reactive, ref, toRefs } from "vue";
import { RemoveEle, SelectStack } from "./type";
import formA from "./forms/a.vue";

interface FormData {
  name: string;
  region: string;
  date1: string;
  date2: string;
  delivery: boolean;
  type: Array<string>;
  resource: string;
  desc: string;
}

function formDataFactory(): FormData {
  return {
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
  }
}

export default defineComponent({
  components: {
    VueBpmn,
    formA,
  },
  setup() {
    const state = reactive({
      options: {
        propertiesPanel: {},
        additionalModules: [],
        moddleExtensions: [],
      },
      ruleForms: new Map<string, FormData>(),
    });

    const selectionActivie = ref('');

    function handleError(err: Error) {
      console.error("failed to show diagram", err);
    }
    function handleShown() {
      console.log("diagram shown");
    }
    function handleLoading() {
      console.log("diagram loading");
    }

    function selectionChangeHandler({
      newSelection,
      oldSelection,
    }: SelectStack) {
      const id = newSelection[0]!.id;
      selectionActivie.value = id;
      const target = state.ruleForms.get(id);
      if (!target) {
        state.ruleForms.set(id, formDataFactory())
      }
    }

    function removeHandler(removeEle: RemoveEle) {
      console.log(removeEle.element.id);
    }

    const ruleForm = computed(
      () => {
        const id = selectionActivie.value;
        let target = state.ruleForms.get(id);
        if (!target) {
          target = formDataFactory();
          state.ruleForms.set(id, target)
        }
        return target
      }
    )

    return {
      ...toRefs(state),
      handleError,
      handleShown,
      handleLoading,
      selectionChangeHandler,
      removeHandler,
      ruleForm
    };
  },
});
</script>