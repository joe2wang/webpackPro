import './example.css'
import src from './images/file.jpg'
import printMe from './print'
import { cube } from './math'
import _ from 'lodash'
function component () {
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

  element.appendChild(img)
  element.appendChild(hello)
  element.appendChild(btn)
  console.log(_.join(['index', 'module', 'loaded!'], ' '))
  return element
}

document.body.appendChild(component())
