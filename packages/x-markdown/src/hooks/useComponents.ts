import { h } from 'vue';
import CodeX from '../components/CodeX/index.vue';

/**
 * 创建自定义组件映射
 * @param props - 包含 codeXRender 等配置的 props
 * @returns 组件映射对象
 */
function useComponents(props?: { codeXRender?: Record<string, any> }) {
  const components = {
    // code 元素使用 CodeX 组件渲染，传入 raw 数据和 codeXRender 配置
    code: (raw: any) => h(CodeX, { raw, codeXRender: props?.codeXRender })
  };
  return components;
}

export { useComponents };
