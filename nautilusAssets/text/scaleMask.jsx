try {
  var maskInTangent = thisLayer.mask("Mask 1").maskPath.inTangents()[textIndex - 1];
  var maskOutTangent = thisLayer.mask("Mask 1").maskPath.outTangents()[textIndex - 1];

  var s = thisProperty.propertyGroup(3).property.scale;

  var from = (100 / (s[0] - 100)) * -100;
  var to = 100;

  var tangentsLength = (length(maskInTangent) + length(maskOutTangent));

  if (tangentsLength == 0) {
    throw "Disable"
  }

  var finals = linear(tangentsLength / 2, 0, 100, from, to);
	[finals, finals]
} catch (e) {
  [0, 0]
}

// ("NAUTIFLOW_FX_NAME")