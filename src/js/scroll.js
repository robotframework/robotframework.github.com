// animated scrolling because Safari can't do it natively

const easeInOutQuad = (t, b, c, d) => {
  let t2 = t / (d / 2)
  if (t2 < 1) return (c / 2) * t2 * t2 + b
  t2 -= 1
  return (-c / 2) * (t2 * (t2 - 2) - 1) + b
}

export const scrollToElement = (elementId, duration) => {
  const to = elementId ? document.getElementById(elementId).offsetTop - 80 : 0
  const parent = document.scrollingElement || document.documentElement
  const start = parent.scrollTop

  const change = to - start
  const startDate = +new Date()

  const animateScroll = () => {
    const currentDate = +new Date()
    const currentTime = currentDate - startDate
    parent.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration), 10)
    if (currentTime < duration) {
      requestAnimationFrame(animateScroll)
    } else {
      parent.scrollTop = to
    }
  }
  animateScroll()
}

export const scrollToPosition = (position, duration) => {
  // position is target height calculated from top of the page
  const parent = document.scrollingElement || document.documentElement
  const start = parent.scrollTop

  const change = position - start
  const startDate = +new Date()

  const animateScroll = () => {
    const currentDate = +new Date()
    const currentTime = currentDate - startDate
    parent.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration), 10)
    if (currentTime < duration) {
      requestAnimationFrame(animateScroll)
    } else {
      parent.scrollTop = position
    }
  }
  animateScroll()
}
