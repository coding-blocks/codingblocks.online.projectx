export const defaultProgressValueForContent = content => {
  switch (content.contentable) {
    case 'code-challenge':
    case 'lecture':
      return 'ACTIVE'
    default:
      return 'DONE'
  }
}

export const slugify = (title) => title.trim().replace(/ ?- ?/g, "-").replace(/ /g, "-")
