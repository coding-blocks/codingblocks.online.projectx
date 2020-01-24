import buttons from './buttons'


export default [
  {
    attachTo: {
      element: '#contentScrollContainer',
      on: 'right'
    },
    buttons: [
      buttons.cancel,
      buttons.next
    ],
    title: 'These are the list of contents',
    text: `
      <p> Welcome to the machine! </p>
    `
  },
  {
    attachTo: {
      element: '#bookmark-content',
      on: 'left'
    },
    buttons: [
      buttons.cancel,
      buttons.next
    ],
    title: 'You can bookmark your content',
    text: `
      <p> Welcome my son! </p>
    `
  },
  {
    attachTo: {
      element: '#content-searchbox',
      on: 'bottom'
    },
    buttons: [
      buttons.cancel,
      buttons.next
    ],
    title: 'You can search contents here',
    text: `
      <p> Welcome my son! </p>
    `
  },
  {
    attachTo: {
      element: '#ask-doubt',
      on: 'left'
    },
    buttons: [
      buttons.cancel,
      buttons.next
    ],
    title: 'Ask your doubts here!',
    text: `
      <p> Welcome my son! </p>
    `
  },

]