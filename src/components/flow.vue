<template>
  <vue-bpmn
    @selectChange="selectionChangeHandler"
    @remove:shape="removeHandler"
  >
    <form-a v-if="selectionActivie" :ruleForm="ruleForm" />
  </vue-bpmn>
</template>

<script lang="ts">
import VueBpmn from "./vue3-bpmn.vue";
import { computed, defineComponent, inject, nextTick, reactive, ref, toRefs, watch } from "vue";
import { RemoveEle, SelectStack } from "./type";
import formA from "./forms/a.vue";
import Bus from '../utils/eventBus';

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
    const eventBus: Bus = inject('$bus')!;
    eventBus.on('ButtonSetup', () => {
      console.log(1111)
    })
    const state = reactive({
      options: {
        propertiesPanel: {},
        additionalModules: [],
        moddleExtensions: [],
      },
      ruleForms: new Map<string, FormData>(),
    });

    const selectionActivie = ref('');

    function selectionChangeHandler({
      newSelection,
    }: SelectStack) {
      const id = newSelection[0]!.id;
      const target = state.ruleForms.get(id);
      if (!target) {
        state.ruleForms.set(id, formDataFactory())
      }
      nextTick(() => {
        selectionActivie.value = id;
      })
    }

    function removeHandler(removeEle: RemoveEle) {
      const id = removeEle.element.id;
      state.ruleForms.delete(id);
    }

    const ruleForm = computed(
      () => {
        const id = selectionActivie.value;
        return state.ruleForms.get(id);
      }
    )

    return {
      ...toRefs(state),
      selectionChangeHandler,
      removeHandler,
      ruleForm,
      selectionActivie
    };
  },
});
</script>