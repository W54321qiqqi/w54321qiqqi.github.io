<script lang="tsx">
import { CSSProperties } from 'vue'
import svgIcon from './svg/index.vue'
export default defineComponent({
  components: {
    svgIcon,
  },
  name: 'BaseIcon',
  props: {
    name: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '18px',
    },
    color: {
      type: String,
      default: '',
    },
    hover: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const iconStyle = computed((): CSSProperties => {
      const { size, color } = props
      let fontSize = `${size.replace('px', '')}px`
      return {
        fontSize,
        color: color,
      }
    })
    const getHover = computed(() => {
      return props.hover ? 'base-icon base-icon-hover' : 'base-icon'
    })
    if (props.name.indexOf('el-icon-') === 0) {
      return () => (
        <el-icon
          size={props.size}
          color={props.color}
          class={`${getHover.value} el-icon`}
        >
          {h(resolveComponent(props.name))}
        </el-icon>
      )
    } else if (props.name.indexOf('local-') === 0) {
      return () => (
        <svg-icon
          name={props.name}
          size={props.size}
          color={props.color}
          class={getHover.value}
        ></svg-icon>
      )
    } else {
      return () => (
        <i
          class={`${props.name} ${getHover.value}`}
          style={iconStyle.value}
        ></i>
      )
    }
  },
})
</script>
<style lang="scss" scoped>
.base-icon-hover:hover {
  color: var(--el-color-primary) !important;
  transform: scale(1.3);
  vertical-align: -0.15em;
}
</style>
