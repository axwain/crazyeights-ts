import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Vite + TypeScript</h1>
  </div>
`

const ws = new WebSocket('ws://127.0.0.1:9010')

ws.onopen = () => { console.log('opened connection') }
ws.onmessage = (event) => { console.log('received', event.data) }

