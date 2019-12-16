import Route from "@ember/routing/route";

export default Route.extend({
  model(params) {
    // TODO: redirect to content specific route
    const content = this.modelFor('attempt.content')
    switch (content.contentable) {
      case 'code-challenge': 
        return this.transitionTo('attempt.content.code-challenge')
      case 'csv': 
        return this.transitionTo('attempt.content.csv')
      case 'document': 
        return this.transitionTo('attempt.content.document')
      case 'lecture': 
        return this.transitionTo('attempt.content.lecture')
      case 'video': 
        return this.transitionTo('attempt.content.video')
      case 'qna':
        return this.transitionTo('attempt.content.quiz', content.get('payload.qId'))
    }
  }
});
