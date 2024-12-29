import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = (props) => {
  const hideWhenVisible = { display: props.visible ? 'none' : '' }
  const showWhenVisible = { display: props.visible ? '' : 'none' }

  const toggleVisibility = () => {
    props.setVisible(!props.visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="primary" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="danger" onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}
Togglable.displayName = 'Togglable'

export default Togglable
