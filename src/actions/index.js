const imagemin = nodeRequire('imagemin')
const imageminGifsicle = nodeRequire('imagemin-gifsicle')
const imageminJpegoptim = nodeRequire('imagemin-jpegoptim')
const imageminOptipng = nodeRequire('imagemin-optipng')
const imageminPngquant = nodeRequire('imagemin-pngquant')
const imageminSvgo = nodeRequire('imagemin-svgo')

export const compressImg = async (filePath, newPath) => {
  return imagemin([filePath], newPath, {
    plugins: [
      imageminGifsicle(),
      imageminOptipng(),
      imageminJpegoptim({ max: 70 }),
      imageminSvgo(),
      imageminPngquant({
        quality: [0.6, 0.8]
      })
    ]
  })
}
