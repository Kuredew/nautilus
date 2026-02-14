try {
  var ctrlFx = effect("NautiFlow");
  var maskInTangent = thisLayer.mask("Mask 1").maskPath.inTangents()[textIndex - 1];
  var maskOutTangent = thisLayer.mask("Mask 1").maskPath.outTangents()[textIndex - 1];

  var tangentsLength = length(maskInTangent) + length(maskOutTangent)
  var maxScale = ctrlFx("Max Scale");

  (tangentsLength / maxScale) * 100;
} catch (e) {
  [100, 100]
}