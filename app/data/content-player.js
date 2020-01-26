import buttons from './buttons'

const onMobile = window.innerWidth <= 800

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
    title: 'Table of Contents',
    text: `
      <p> See the whole list of course contents here
      </p>
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
    title: 'Bookmark your favourite content',
    text: `
      <p>
        Bookmark the particular section of the course you'd like to watch again and access it directly from your course library
      </p>
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
      <p> Click and type here to search the section video you want to watch
      </p>
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
      <p> Scroll down here to ask your doubt/ raise your query
      </p>
    `
  },
  {
    attachTo: {
      element: '#start-player-tour',
      on: 'left'
    },
    buttons: [
      buttons.cancel
    ],
    title: 'Restart Tour',
    highlightClass: 'px-3',
    text: `
      <p>
       Click here to restart this tour anytime.
      </p>
    `
  }

]