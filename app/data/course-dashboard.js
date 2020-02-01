import buttons from './buttons'

const ifElementExists = id => () => !!document.getElementById(id)

const onMobile = window.innerWidth <= 800

const and = () => [...arguments].reduce((acc, fn) => acc && fn(), true)

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
    canClickTarget: false,
    title: 'Welcome to the new course Dashboard',
    text: `
      <p> This is your course dashboard. 
          You can glance over your progress, track milestones and find all necessary information regarding the course here.
      </p>
    `
  },
  {
    attachTo: {
      element: '#goodies-lock',
      on: onMobile ? 'bottom' : 'right'
    },
    buttons: [
      buttons.back,
      buttons.next
    ],
    showOn: ifElementExists('goodies-lock'),
    title: 'Complete your course - Goodies',
    text: `
      <p> 
        Complete the course to be unlock free goodies!
      </p>
    `,
    highlightClass: 'px-3'
  },
  {
    attachTo: {
      element: '#certificate-lock',
      on: onMobile ? 'bottom' : 'right'
    },
    buttons: [
      buttons.back,
      buttons.next
    ],
    showOn: ifElementExists('certificate-lock'),
    title: 'Complete your course - Certification',
    text: `
      <p> 
        Let's get certified! Unlock your certificate from here
      </p>
    `,
    highlightClass: 'px-3'
  },
  {
    attachTo: {
      element: '#join-whatsapp-card',
      on: onMobile ? 'bottom' : 'right'
    },
    buttons: [
      buttons.back,
      buttons.next
    ],
    showOn: ifElementExists('join-whatsapp-card'),
    title: 'Join the Conversation!',
    text: `
      <p> 
        Tap here join the whatsapp group for this batch.
      </p>
    `,
    highlightClass: 'border-radius-none'
  },
  {
    attachTo: {
      element: '#course-library',
      on: 'top'
    },
    buttons: [
      buttons.back,
      buttons.next
    ],
    title: 'This is the course library',
    text: `
      <p> Click here to manage all your Notes, Bookmarks, Announcements and Doubts at once. </p>
    `
  },
  {
    attachTo: {
      element: '#performance-stats',
      on: 'top'
    },
    buttons: [
      buttons.back,
      buttons.next
    ],
    title: 'These are your stats!',
    text: `
      <p> Take a look at your all-time course progress from here </p>
    `
  },
  {
    attachTo: {
      element: '#course-intro',
      on: 'left'
    },
    buttons: [
      buttons.back,
      buttons.next
    ],
    title: 'Read Me!',
    text: `
      <p>
       Read on to find out what you are going to learn in this course.
      </p>
    `
  },
  {
    attachTo: {
      element: '#start-course-dashboard-tour',
      on: onMobile ? 'bottom' : 'right'
    },
    buttons: [
      buttons.cancel
    ],
    title: 'Restart Tour',
    highlightClass: 'p-3',
    text: `
      <p>
       Click here to restart this tour anytime.
      </p>
    `
  }
]