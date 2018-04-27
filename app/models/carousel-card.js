import DS from "ember-data";

export default DS.Model.extend({
  title: DS.attr("string"),
  subtitle: DS.attr("string"),
  img: DS.attr("string"),
  buttonLink: DS.attr("string"),
  buttonText: DS.attr("string"),
  order: DS.attr("number")
});