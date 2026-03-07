export function handleError(msg) {
  alert("One function of Nautilus gives an Error.\n\nDetail:\n" + msg + "\n\nYou can open an issue at\nhttps://github.com/Kuredew/nautilus\nif the problem persist.");
}

export function handleLoadError(msg) {
  alert("There was a problem loading Nautilus into After Effects.\n\nDetail:\n" + msg + "\n\nOpen an issue at\nhttps://github.com/Kuredew/nautilus\nif the problem persist.")
}