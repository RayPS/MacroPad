import * as fs from 'fs'

export default function progmem (options: {
  source: string;
  destination: string;
}) {
  const { source, destination } = options

  const wstream = fs.createWriteStream(destination)
  wstream.on('error', function (err) {
    console.log(err)
  })

  const data = fs.readFileSync(source)

  wstream.write('#ifndef HTML_H\n')
  wstream.write('#define HTML_H\n\n')
  wstream.write('#include <Arduino.h>\n\n')

  wstream.write(`#define html_len ${data.length}\n\n`)

  wstream.write('const uint8_t html[] PROGMEM = {')

  for (let i = 0; i < data.length; i++) {
    if (i % 1000 == 0) { wstream.write('\n') }
    wstream.write(`0x${(`00${data[i].toString(16)}`).slice(-2)}`)
    if (i < data.length - 1) { wstream.write(',') }
  }

  wstream.write('\n};')

  wstream.write('\n\n#endif\n')

  wstream.end()
}
