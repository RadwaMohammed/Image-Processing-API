import sharp from 'sharp';
import { ImgInfo } from './validate';

const resizeImage = async (img: ImgInfo): Promise<void> => {
  const width = +img.imgWidth;
  const height = +img.imgHeight;
  await sharp(img.imgPath)
    .resize(width, height)
    .jpeg({ mozjpeg: true })
    .toFile(img.newImgPath)
    .then()
    .catch();
};

export default resizeImage;
