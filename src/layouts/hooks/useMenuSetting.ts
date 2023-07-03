import { MenuSetting, useAppStoreWithOut } from '/@/store/modules/settings'
import { isUndefined } from '/@/utils/is'

export const useMenuSetting = () => {
  const appStore = useAppStoreWithOut()

  const getCollapse = computed(() => appStore?.menuConfig?.collapse)

  const getMode = computed(() => appStore?.menuConfig?.mode)

  const getSideWidth = computed(() => appStore?.menuConfig?.sideWidth)

  const getSideCollapsed = computed(() => appStore?.menuConfig?.sideCollapsed)

  const setMenuSetting = (menuConfig: MenuSetting) => {
    appStore.setAppConfig({ menuConfig })
  }

  const toggleCollapse = (flag?: boolean) => {
    setMenuSetting({ collapse: isUndefined(flag) ? !unref(getCollapse) : flag })
  }

  return {
    toggleCollapse,
    setMenuSetting,
    getCollapse,
    getMode,
    getSideWidth,
    getSideCollapsed,
  }
}
