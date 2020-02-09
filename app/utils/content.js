export const defaultProgressValueForContent = content => {
  switch (content.contentable) {
    case 'code-challenge':
    case 'lecture':
      return 'ACTIVE'
    default:
      return 'DONE'
  }
}
