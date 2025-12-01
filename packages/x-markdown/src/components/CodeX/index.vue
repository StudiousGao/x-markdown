<script lang="ts">
import { defineComponent, h } from 'vue';
// @ts-ignore
import CodeBlock from '../CodeBlock/index.vue';
// @ts-ignore
import CodeLine from '../CodeLine/index.vue';
import Mermaid from '../Mermaid/index.vue';
export default defineComponent({
  props: {
    // 原始代码数据
    raw: {
      type: Object,
      default: () => ({})
    },
    // 自定义代码块渲染器映射
    codeXRender: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    // 从 props 获取自定义渲染器
    const { codeXRender } = props;
    return (): ReturnType<typeof h> | null => {
      // 处理行内代码
      if (props.raw.inline) {
        // 检查是否有自定义行内代码渲染器
        if (codeXRender && codeXRender.inline) {
          const renderer = codeXRender.inline;
          if (typeof renderer === 'function') {
            return renderer(props);
          }
          return h(renderer, props);
        }
        // 默认使用 CodeLine 组件
        return h(CodeLine, props);
      }
      // 处理代码块
      const { language } = props.raw;
      // 检查是否有该语言的自定义渲染器
      if (codeXRender && codeXRender[language]) {
        const renderer = codeXRender[language];
        if (typeof renderer === 'function') {
          return renderer(props);
        }
        return h(renderer, props);
      }
      // mermaid 使用专用组件
      if (language === 'mermaid') {
        return h(Mermaid, props);
      }
      // 默认使用 CodeBlock 组件
      return h(CodeBlock, props);
    };
  }
});
</script>
