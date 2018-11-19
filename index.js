const fs = require('fs')
const jsonMark = require('jsonmark')
const path = require('path')

const ul = (items = []) => `
<ul>
${items.map(({ text, url }) => (`
  <li>
    <a href="${url}">${text}</a>
  </li>
`)).join('\n')}
</ul>
`
module.exports = {
  blocks: {
    index: {
      process(block, ...rest) {
        const source = this.ctx.ctx.file.path

        const dir = path.dirname(source)

        try {
          const files = fs.readdirSync(dir)
          const s = path.basename(source)

          const listItems = files.filter(f => f !== s)
            .filter(f => f.endsWith('.md'))
            .sort((a, b) => parseInt(a) - parseInt(b))
            .map(f => ({
              path: f,
              markdown: jsonMark.parse(
                fs.readFileSync(`${dir}/${f}`,{ encoding: 'utf8' })
              ) || {}
            }))
            .map(({ path, markdown }) => ({
              text: markdown.order ? markdown.order[0] : path.match(/[0-9]-(.*?)\./)[1],
              url: encodeURI(path.replace(/\.md$/, '.html'))
            }))

          return ul(listItems)
        } catch (e) {
          return (`
            <span style="color: maroon;">
              gitbook-plugin-index-list: could not generate index list:
              <blockquote style="border-color: #FFB2B2; color: red;">
                ${e}
              </blockquote>
            </span>
          `)
        }
      }
    }
  }
}
