import DS from "ember-data";

export default DS.Model.extend({
  title: DS.attr("string"),
  subtitle: DS.attr("string"),
  img: DS.attr("string"),
  theme: DS.attr('string', { defaultValue: 'bg-gradient-dpurple' }),
  buttonLink: DS.attr("string"),
  buttonText: DS.attr("string"),
  order: DS.attr("number")
});