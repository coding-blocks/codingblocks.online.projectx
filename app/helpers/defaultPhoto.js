import { helper } from '@ember/component/helper';

export function defaultPhoto(params) {
  const [photo, id = 0] = params;
  if (photo) {
    return photo;
  }
  const defaultAvatarId = (id % 35) + 1;
  return `https://minio.codingblocks.com/img/avatar-${defaultAvatarId}.svg`;
}

export default helper(defaultPhoto);
