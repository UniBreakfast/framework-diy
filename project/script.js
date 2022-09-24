const data = {
  userName: 'John Doe',
  age: 30,
  country: 'USA',
  education: {
    school: 'Massachusetts College of Art and Design',
    universities: [
      {
        name: "Massachusetts Institute of Technology",
        courses: [
          {
            name: "Introduction to Computer Science and Programming Using Python",
            grade: "A"
          },
          {
            name: "Introduction to Computational Thinking and Data Science",
            grade: "A"
          },
          {
            name: "Introduction to Computational Thinking and Data Science",
            grade: "A"
          },
        ]
      },
      'Harvard',
      'Stanford',
    ],
  },
  inputValue: '',
}
const proxyData = new Proxy(data, {
  get(target, key) {
    if (key in target) {
      return target[key]
    }

    return ''
  },
  set(target, key, value) {
    if (key === 'age' && value < 0) value = 0

    target[key] = value

    repeatFn()
    addEventListeners()

    // const elements = getElementsByInnerText(`{{ ${key} }}`)

    // for (const el of elements) {
    //   applyData(el, target)
    // }

    return true
  }
})

const componentsDic = {}

let repeatFn

Document.prototype.getElementsByInnerText = getElementsByInnerText

insertComponents(body).then(() => {
  repeatFn = applyData(body, proxyData)
}).then(addEventListeners)

function addEventListeners() {
  const [minusBtn] = document.getElementsByInnerText('-')
  const [plusBtn] = document.getElementsByInnerText('+')

  minusBtn.onclick = () => proxyData.age--
  plusBtn.onclick = () => proxyData.age++

  input.oninput = () => proxyData.userName = proxyData.inputValue = input.value
}

function applyData(el, data) {
  const template = el.innerHTML

  replace()

  return replace

  function replace() {
    // get element in focus
    const {activeElement} = document

    el.innerHTML = template.replace(/{{\s*([a-zA-Z0-9_.\[\]]+)\s*}}/g, (match, key) => {
      if (key.includes('.')) {
        const keys = key.split('.')
        let value = data

        for (const key of keys) {
          const hasIndices = key.match(/\[(\d+)\]/)

          if (hasIndices) {
            const [keyName, indices] = key.split(/(?<=[^\]])(?=\[)/)

            value = value[keyName]

            for (const [match, i] of key.matchAll(/\[(\d+)\]/g)) {
              value = value[i]
            }
          } else {
            value = value[key]
          }
        }

        return value
      }

      return data[key]
    })

    if (activeElement.id === 'input') {
      input.focus()
      input.selectionStart = input.selectionEnd = input.value.length
    }
  }
}

async function insertComponents(el) {
  const componentRE = /<c>\s*([A-Z-]+)\s*<\/c>/g
  const componentsNames = []

  for (const name of el.innerHTML.matchAll(componentRE)) {
    componentsNames.push(name[1])
  }

  await Promise.all(componentsNames.filter(name => !(name in componentsDic)).map(fetchComponent))

  el.innerHTML = el.innerHTML.replace(componentRE, (match, name) => {
    return componentsDic[name]
  })

  if (el.innerHTML.match(componentRE)) await insertComponents(el)
}

function fetchComponent(name) {
  return fetch(`components/${name.toLowerCase()}.html`).then(res => res.text()).then(html => {
    componentsDic[name] = html
  })
}

function getElementsByInnerText(text) {
  return [...document.querySelectorAll('*')].filter(el => el.innerHTML === text)
}
