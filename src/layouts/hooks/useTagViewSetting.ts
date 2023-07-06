import { useTagStoreWithOut } from '/@/store/modules/tagView'
import { useTagEvent } from './useTagEvent'
import { usePermissionStoreWithOut } from '/@/store/modules/permission'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import path from 'path-browserify'
export const useTagViewSetting = () => {
  interface TagItem {
    fullPath: string
    path: string
    name: string
    meta: Record<string | number | symbol, any>
  }
  const tagStore = useTagStoreWithOut()

  const { closeTag } = useTagEvent()
  const permissionStore = usePermissionStoreWithOut()
  const getTagList = computed(() => tagStore.tagList)

  const getCacheTagList = computed(() => tagStore.cacheTagList)
  const getTagFullscreen = computed(() => tagStore.fullscreen)
  const addTag = (route: RouteLocationNormalizedLoaded) => {
    tagStore.addTag(route)
  }

  const filterAffixTags = (routes: any[], basePath = '/') => {
    let tags: TagItem[] = []
    routes.forEach((routeItem) => {
      const route = routeItem
      if (route.meta && route.meta.affix) {
        const tagPath = path.resolve(basePath, route.path)
        tags.push({
          fullPath: tagPath,
          path: tagPath,
          name: route.name,
          meta: { ...route.meta },
        })
      }
      if (route.children) {
        const tempTags = filterAffixTags(route.children, route.path)
        if (tempTags && tempTags.length) {
          tags = [...tags, ...tempTags]
        }
      }
    })
    return tags
  }
  const initTags = () => {
    const affixTags: TagItem[] = filterAffixTags(permissionStore.route)
    tagStore.initTagList(affixTags)
  }
  const toggleFullscreen = () => {
    tagStore.toggleFullscreen()
  }
  return {
    getTagList,
    getCacheTagList,
    closeTag,
    addTag,
    getTagFullscreen,
    initTags,
    toggleFullscreen,
  }
}
