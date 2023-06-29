<script lang="tsx">
import { CSSProperties } from 'vue'
import svgIcon from './svg/index.vue'
export default defineComponent({
  components: {
    svgIcon,
  },
  name: 'Icon',
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
      default: '#000000',
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
    if (props.name.indexOf('el-icon-') === 0) {
      return () => (
        <el-icon
          size={props.size}
          color={props.color}
          class={'base-icon el-icon'}
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
        ></svg-icon>
      )
    } else {
      return () => (
        <i class={`${props.name} 'base-icon'`} style={iconStyle.value}></i>
      )
    }
  },
})
</script>
<style lang="scss" scoped></style>
