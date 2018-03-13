duration = 300;

defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  transitionProperty: 'opacity, transform',
  opacity: 0,
  padding: 20,
}

transitionStyles = {
  entering: {
    opacity: 0,
    transform: 'translateX(-30%)'
  },
  entered: {
    opacity: 1,
    transform: 'translateX(0)'
  },
  exiting: {
    opacity: 0,
    transform: 'translateX(-30%)'
  },
  exited: {
    opacity: 0,
    transform: 'translateX(0%)'
  }
};
