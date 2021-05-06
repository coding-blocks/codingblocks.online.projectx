import Route from "@ember/routing/route"
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service api

  queryParams = {
    contentId: {
      refreshModel: true
    }
  };

  async beforeModel(transition) {
    const { runAttemptId } = this.paramsFor('attempt')
    if(transition.to.queryParams.contentId){
      const run = this.modelFor('attempt').get('run')
      let sectionId=0
      const contentId=transition.to.queryParams.contentId
      const  sections=run.get("sections")

      for(const section of sections.toArray()){
        const contents=await section.get('contents')
        const content=contents.findBy("id",contentId)
        if(content){
          sectionId=section.get("id")
          break
        }
      }
      this.transitionTo(
        "attempt.content",
        runAttemptId,
        sectionId,
        contentId
      );

    }
    else{
      try {
        const nextContent = await this.api.request(`/run_attempts/${runAttemptId}/nextContent`)
    
        this.transitionTo(
          "attempt.content",
          runAttemptId,
          nextContent.sectionId,
          nextContent.contentId
        );
      } catch (err) {
        const run = this.modelFor('attempt').get('run')
        const section = run.get("sections.firstObject")
        await section.get('contents')
        const content = section.get("contents.firstObject")
        
        this.transitionTo(
          "attempt.content",
          runAttemptId,
          section.id,
          content.id
        );
      }
    }
  }
}
