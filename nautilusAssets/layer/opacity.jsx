// For Opacity
var ctrlOpacityStrength = ctrlFx("Opacity Strength").valueAtTime(realTime - delay);

// calculate percent value
// var ctrlOpacity = layerV * (ctrlOpacityStrength / 100);

layerValue = layerValue - (100 - ctrlOpacityStrength)