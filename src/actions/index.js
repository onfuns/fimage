const imagemin = nodeRequire('imagemin')
const imageminGifsicle = nodeRequire('imagemin-gifsicle')
const imageminMozjpeg = nodeRequire('imagemin-mozjpeg')
const imageminOptipng = nodeRequire('imagemin-optipng')
const imageminPngquant = nodeRequire('imagemin-pngquant')
const imageminSvgo = nodeRequire('imagemin-svgo')
import { getBuildPath } from '../utils/util'

export const compressImg = async filePath => {
  return imagemin([filePath], getBuildPath(filePath), {
    plugins: [
      imageminGifsicle(),
      imageminOptipng(),
      imageminMozjpeg({
        quality: 70
      }),
      imageminSvgo(),
      imageminPngquant({
        quality: [0.6, 0.8]
      })
    ]
  })
}
