let path = require('path')
let fs = require('fs')

let getComponents = (dir) =>
    fs.readdirSync(dir)
        .map(d => path.parse(d).name)
        .filter(d => !['index'].includes(d))


let getImports = (components) =>
    components.map(name => `import ${name} from './${name}'`)

let dirs = [
    './src/helpers',
    './src/modules'
]

dirs.forEach(dir => {
    let components = getComponents(dir)
    let importsSection = `${getImports(components).join("\n")}`
    let exportsSection = `export \{\n    ${components.join(",\n    ")}\n\}`
    let barrel = `${importsSection}\n\n${exportsSection}`
    fs.writeFileSync(path.join(dir, 'index.js'), barrel)
})





