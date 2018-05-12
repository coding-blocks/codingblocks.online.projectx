import Component from '@ember/component';

export default Component.extend({
  offerings: [
    {
      name: 'Comprehensive learning',
      body: `Experienced, engaging instructors take you through course material, step by step, in our high-quality video lessons.
       This will help you to keep your skills sharp even after completing the course.`,
      img: 'images/learning.png'
    },{
    name: '24*7 Mentor Support',
    body: `Our programming courses online are a flexible alternative that provides online access to our in-depth curriculum—complete
      with real-time support from instructors, our industry-tested learning platform, hands-on assignments and much more.`,
    img: 'images/24_7.png'
  },{
    name: 'Live Webinars for Doubt Clearing',
    body: `Get exclusive access to Live Webinars where you can interact with mentors for important course topics. Every course batch has multiple live webinars
    which is attended by 100s of students all over the world.`,
    img: 'images/doubt_content.png'
  },{
    name: 'Practice Assignments on HackerBlocks',
    body: `Code directly in the browser with our course challenges, bringing to life what you learned and receiving immediate,
     helpful feedback and code validation.`,
    img: 'images/practice.png'
  },{
    name: 'Revisit and Revise',
    body: `Study the course contents at your own pace. If you're an experienced developer then you can complete the courses in a matter of days.
    If you want to take things slowly you get access to courses for a minimum period of 6 months. You also get an option to purchase an extended availability of the course.`,
    img: 'images/revise.png'
  },{
      name: 'Evaluation and Certification',
      body: `You will be assessed weekly in your path of becoming a Coding Blocks at this certification online course and all the practice,
       assignments and tests will be done on our online automated code judge. After course completion get instructor-signed certificate with our
       logo to verify your achievement and increase your job prospects.`,
      img: 'images/certification-i.png'
    }]
});
