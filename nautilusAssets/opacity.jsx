// For Opacity
var ctrlOpacityStrength = ctrlFx("Opacity Strength").valueAtTime(time - delay);

// calculate percent value
var ctrlOpacity = value * (ctrlOpacityStrength / 100);

ctrlOpacity