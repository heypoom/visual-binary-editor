const fs = require("fs")

const pixelStr = fs.readFileSync(__dirname + "/raw-pixel-data.txt", "utf-8")

const pixelData = pixelStr.split(" ").map(Number)

function chunkList(list, length) {
  const chunks = []
  let i = 0

  while (i < list.length) {
    chunks.push(list.slice(i, (i += length)))
  }

  return chunks
}

function patternToBits(img) {
  const tileSize = 40
  const bits = []

  const [width, height] = [640, 40]

  const pixels = chunkList(img, 4)
  const tiles = chunkList(pixels, width)

  let row = 0
  let col = 0

  while (row < height) {
    col = 0

    while (col < width) {
      let color = tiles[row][col]
      if (!color) continue

      const [red] = color

      console.log(`(${col}, ${row}) -> ${red === 255 ? 1 : 0}`)

      if (red === 255) bits.push(1)
      else if (red === 0) bits.push(0)
      else return []

      col += tileSize + 1
    }

    row += tileSize + 1
  }

  return bits
}

const bits = patternToBits(pixelData)

// Should be 01100001
bits.slice(0, 8).join("") //?
