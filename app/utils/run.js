export const iconForTier = (tier) => {
  switch (tier) {
    case 'LITE': return 'https://cb-thumbnails.s3.ap-south-1.amazonaws.com/lite.png'
    case 'PREMIUM': return 'https://cb-thumbnails.s3.ap-south-1.amazonaws.com/premium.png'
    case 'LIVE': return 'https://cb-thumbnails.s3.ap-south-1.amazonaws.com/live.png'
    case 'CLASSROOM': return 'https://cb-thumbnails.s3.ap-south-1.amazonaws.com/classroom.png'
    default:
      return 'https://cb-thumbnails.s3.ap-south-1.amazonaws.com/lite.png'
  }
}