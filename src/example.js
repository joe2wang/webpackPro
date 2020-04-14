import './css/example.css'
import src from './images/file.jpg'
import printMe from './print'
import { cube } from './math'
import './another'
async function componentFn () {
  var element = document.createElement('div')
  element.align = 'center'

  var btn = document.createElement('button')
  btn.innerHTML = 'Click me and get current time!'
  btn.onclick = printMe

  var hello = document.createElement('div')
  hello.innerHTML = 'Hello,webpack' + ' ' + cube(5)
  hello.classList.add('hello')

  var img = new Image()
  img.src = src

  var mod = document.createElement('div')
  const _ = await import('lodash')
  mod.innerHTML = _.join(['Index', 'module', 'loaded!'], ' ')

  element.appendChild(img)
  element.appendChild(hello)
  element.appendChild(btn)
  element.appendChild(mod)

  return element
}
componentFn().then(component=>{
  document.body.appendChild(component)
})

