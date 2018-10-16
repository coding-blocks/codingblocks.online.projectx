export default function(){
  // Add your transitions here, like:
  //   this.transition(
  //     this.fromRoute('people.index'),
  //     this.toRoute('people.detail'),
  //     this.use('toLeft'),
  //     this.reverse('toRight')
  //   );

  const tabs = ['classroom.timeline.overview', 'classroom.timeline.contents', 'classroom.timeline.announcements', 'classroom.timeline.doubts']
  
  for (let i = 0; i<tabs.length; i++) {
    for (let j = i+1 ; j<tabs.length ; j++) {
      this.transition(
        this.fromRoute(tabs[i]),
        this.toRoute(tabs[j]),
        this.use('toLeft'),
        this.reverse('toRight')
      )
    }
  }

  this.transition(
    this.hasClass('slide'),
  
    // this makes our rule apply when the liquid-if transitions to the
    // true state.
    this.toValue(true),
    this.use('toLeft', {duration: 1}),
  
    // which means we can also apply a reverse rule for transitions to
    // the false state.
    this.reverse('crossFade', {duration: 1})
  );
}
