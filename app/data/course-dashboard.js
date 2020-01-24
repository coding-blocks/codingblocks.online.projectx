import buttons from './buttons'


export default [
  {
    attachTo: {
      element: '#course-information-card',
      on: 'left'
    },
    buttons: [
      buttons.cancel,
      buttons.next
    ],
    title: 'Welcome to your new dashboard',
    text: `
      <p> Welcome to the machine! </p>
    `
  },
  {
    attachTo: {
      element: '#course-library',
      on: 'left'
    },
    buttons: [
      buttons.cancel,
      buttons.next
    ],
    title: 'This is the course library',
    text: `
      <p> Welcome my son! </p>
    `
  },
  {
    attachTo: {
      element: '#performance-stats',
      on: 'left'
    },
    buttons: [
      buttons.cancel,
      buttons.next
    ],
    title: 'These are your stats!',
    text: `
      <p> Welcome my son! </p>
    `
  },
  {
    attachTo: {
      element: '#course-intro',
      on: 'left'
    },
    buttons: [
      buttons.cancel,
      buttons.next
    ],
    title: 'Read Me!',
    text: `
      <p> Welcome my son! </p>
    `
  }
]