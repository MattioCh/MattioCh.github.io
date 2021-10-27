import { render } from 'react-dom'
import React, { useRef , useState} from 'react'
import clamp from 'lodash-es/clamp'
import { useSprings, animated ,useSpring ,interpolate} from 'react-spring'
import { useGesture } from 'react-use-gesture'
import './styles.css'

const pages = [
    ["Matthew Chuang", "and the walkdown about him."],
    [""]
]

function Text() {
    const [flip, set] = useState(false)
    const props = useSpring({
      to: { opacity: 1 },
      from: { opacity: 0 },
      reset: true,
      reverse: flip,
      delay: 200,
    //   config: config.molasses,
      onRest: () => set(!flip),
    })
  
    return <animated.h1 style={props}>hello</animated.h1>;
  }

function Test({ index }) {
    
    
    switch (index) {
        case 0:
            return (
                <div class="container">
                    <h1>{`hihdisfxw`} {index}</h1>
                </div>
                
            );
        default:
            return (
                <div class="container">
                    <h1>default {index}</h1>
                </div>
                
            );
    }
}
  
function Viewpager() {
  const index = useRef(0)
  const [props, set] = useSprings(pages.length, i => ({ x: i * window.innerWidth, sc: 1, display: 'block' }))
  const bind = useGesture(({ down, delta: [xDelta], direction: [xDir], distance, cancel }) => {
    if (down && distance > window.innerWidth / 3)
      cancel((index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, pages.length - 1)))
    set(i => {
      if (i < index.current - 1 || i > index.current + 1) return { display: 'none' }
      const x = (i - index.current) * window.innerWidth + (down ? xDelta : 0)
      const sc = down ? 1 - distance / window.innerWidth / 2 : 1
      return { x, sc, display: 'block' }
    })
  })
  return props.map(({ x, display, sc }, i) => (
    <animated.div {...bind()} key={i} style={{ display, transform: x.interpolate(x => `translate3d(${x}px,0,0)`) }}>
          {/* <animated.div style={{ transform: sc.interpolate(s => `scale(${s*0.75})`), backgroundImage: `url(${pages[i]})` }} /> */}
          <animated.div style={{ transform: sc.interpolate(s => `scale(${s * 0.75})`) }}>
              <Test index={i} />
              <Text/>
          </animated.div>
    </animated.div>
      
  ))
}


render(<Viewpager />, document.getElementById('root'))


* {
    box-sizing: border-box;
  }
  
  html,
  body {
    overscroll-behavior-y: contain;
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    user-select: none;
    font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto,
      segoe ui, arial, sans-serif;
    position: fixed;
    overflow: hidden;
  }
  
  #root {
    position: fixed;
    overflow: hidden;
    width: 100%;
    height: 100%;
    /* cursor: url('https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/Ad1_-cursor.png') 39 39, auto; */
  }
  
  #root > div {
    position: absolute;
    width: 100vw;
    height: 100vh;
    will-change: transform;
  }
  
  #root > div > div {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    width: 100%;
    height: 100%;
    will-change: transform;
    box-shadow: 0 62.5px 125px -25px rgba(50, 50, 73, 0.5), 0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6);
  }

  h1 {
    flex: auto;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    width: 8em;
  }
  