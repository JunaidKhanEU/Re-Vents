import React, { Component } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { v4 } from 'uuid'
import { updateEventAction, createEventAction } from '../../../store/Event/eventActions'
export class EventForm extends Component {
  state= { ...this.props.event }
  componentDidMount () {
    if (this.props.selectedEvent !== null) {
      this.setState({
        ...this.props.selectedEvent
      })
    }
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    if (this.state.id) {
      this.props.updateEventAction(this.state)
      this.props.history.push(`/events/${this.state.id}`)
    } else {
      const newEvent = {
        ...this.state,
        id: v4(),
        hostPhotoURL: '/assets/user.png'
      }
      this.props.createEventAction(newEvent)
      this.props.history.push(`/events/${newEvent.id}`)
    }
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    })
  }

  render () {
    const { title, date, city, venue, hostedBy } = this.state

    return (
      <Segment>
        <Form onSubmit={this.handleFormSubmit} autoComplete='off'>
          <Form.Field>
            <label>Event Title</label>
            <input placeholder='Event Title' value={title} name='title' onChange={this.handleInputChange} />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input type='date' placeholder='Event Date' value={date} name='date' onChange={this.handleInputChange} />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input placeholder='City event is taking place' value={city} name='city' onChange={this.handleInputChange} />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input placeholder='Enter the Venue of the event' value={venue} name='venue' onChange={this.handleInputChange} />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input placeholder='Enter the name of person hosting' value={hostedBy} name='hostedBy' onChange={this.handleInputChange} />
          </Form.Field>
          <Button positive type='submit'>
            Submit
          </Button>
          <Button type='button' onClick={() => this.props.history.goBack()}>Cancel</Button>
        </Form>
      </Segment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id
  let event = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
  }
  if (eventId && state.events.length > 0) {
    event = state.events.filter(evt => evt.id === eventId)[0]
  }
  return {
    event
  }
}

const actions = {
  updateEventAction,
  createEventAction
}
export default connect(mapStateToProps, actions)(EventForm)
