import defaultSettings from '@/settings'

const title = defaultSettings.title || 'CPC1HN'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
