import Component from '@ember/component';

export default Component.extend({
  offerings: [
    {
      name: 'Comprehensive learning',
      body: `Experienced, engaging instructors take you through course material, step by step, in our high-quality video lessons.
       This will help you keep your skills sharp even after completing the course.`,
      img: 'images/learning.svg'
    },{
    name: '24x7 Mentor Support',
    body: `Our programming courses online are a flexible alternative that provides access to our in-depth curriculum-complete
      with real-time support from instructors, our own industry-tested learning platform, hands-on assignments and much more, all from the comfort of your abode.`,
    img: 'images/24_7.svg'
  },{
    name: 'Live Webinars for Doubt Clearing',
    body: `Get exclusive access to Live Webinars where you can interact with mentors for important course topics. Every course batch has multiple live webinars
     attended by hundreds of students all over the world.`,
    img: 'images/doubt.svg'
  },{
    name: 'Practice Assignments on HackerBlocks',
    body: `Code directly in the browser with our course challenges, bringing to life what you learned and receiving immediate,
     helpful feedback and code validation.`,
    img: 'images/practice.svg'
  },{
    name: 'Revisit and Revise',
    body: `Study the course contents at your own pace. If you're an experienced developer, you can complete the courses in a matter of days.
    If you want to take things slowly you get access to courses for a minimum period of 6 months. You also get an option to purchase an extended availability of the course.`,
    img: 'images/revise.svg'
  },{
      name: 'Evaluation and Certification',
      body: `You will be assessed weekly in your path to becoming a Coding Blocks at this online certification course and all the practice,
       assignments and tests will be taken on our online automated code judge. Get an instructor-signed certificate with our
       logo to accredit your achievement after the course completion and increase your job prospects!`,
      img: 'images/certification-i.svg'
    }]
});
