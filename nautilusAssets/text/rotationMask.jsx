try {
  var maskInTangent = thisLayer.mask("Mask 1").maskPath.inTangents()[textIndex - 1];
  var maskOutTangent = thisLayer.mask("Mask 1").maskPath.outTangents()[textIndex - 1];

  var maskDegrees = radiansToDegrees(Math.atan2(maskOutTangent[1], maskOutTangent[0]));
  
  (maskDegrees / 180) * 100
} catch (e) {
  [0, 0]
}

// ("NAUTIFLOW_FX_NAME")