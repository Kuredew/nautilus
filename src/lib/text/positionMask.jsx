try {
  var maskPoint = thisLayer.mask("Mask 1").maskPath.points()[textIndex - 1];

  var x = (maskPoint[0] / thisComp.width) * 100;
  var y = (maskPoint[1] / thisComp.height) * 100;

  [x, y]
} catch (e) {
  [0, 0]
}

// ("NAUTIFLOW_FX_NAME")