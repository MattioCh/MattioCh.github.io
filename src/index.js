import { render } from 'react-dom'
import React, { button,useState, useCallback } from 'react'
import { useTransition, animated , useSpring } from 'react-spring'
import './styles.css'
import {Page9, Page1 , Page2, Page3, Page4 ,Page5, Page6, Page7, Page8} from "./Posts/pages"



export default function App() {
  const [index, set] = useState(0)
  const flip = useCallback(() => set((state) => (state + 1) % pages.length), [])

  const pages = [
    ({ style }) => (
      <animated.div style={{ ...style, background: '#68869A' }}>
        <Page1></Page1>
      </animated.div>
    ),
    ({ style }) => <animated.div style={{ ...style, background: '#0f4c81' }}><Page2/></animated.div>,
    ({ style }) => <animated.div style={{ ...style, background: '#5885af' }}><Page3></Page3></animated.div>,
    ({ style }) => <animated.div style={{ ...style, background: '#1f4c73' }}><Page4></Page4></animated.div>,
    ({ style }) => <animated.div style={{ ...style, background: '#41729f' }}><Page5></Page5></animated.div>,
    ({ style }) => <animated.div style={{ ...style, background: '#274472' }}><Page6></Page6></animated.div>,
    ({ style }) => <animated.div style={{ ...style, background: '#7ec8e3' }}><Page7></Page7></animated.div>,
    ({ style }) => <animated.div style={{ ...style, background: '#05445e' }}><Page8></Page8></animated.div>,
    ({ style }) => <animated.div style={{ ...style, background: '#189ab4' }}><Page9></Page9></animated.div>,
  ]

  const transitions = useTransition(index, (p) => p, {
    from: { opacity: 0, transform: 'translate3d(100%,100%,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-100%,100%,0)' },
    delay: 10,
  })
  return (
    <div className="simple-trans-main"
      onClick={flip}
    >
      {transitions.map(({ item, props, key }) => {
        const Page = pages[item]
        return <Page key={key} style={props} />
      })}
    </div>
  )
}

render(<App />, document.getElementById('root'))
