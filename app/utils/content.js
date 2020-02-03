export const defaultProgressValueForContent = content => {
  switch (content.contentable) {
    case 'code-challenge':
    case 'lecture':
    case 'video':
      return 'ACTIVE'
    default:
      return 'DONE'
  }
}
