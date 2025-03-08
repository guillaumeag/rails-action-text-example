// Update heading button in the Trix toolbar
// Replace h1 tag by h2 since h1 is reserved for the title of the page
Trix.config.blockAttributes.heading1 = {
  breakOnReturn: true,
  group: false,
  tagName: "h2",
  terminal: true
}

// Configure a new heading button for the Trix toolbar
// Button creates a new h3 tag (like subtitle)
Trix.config.blockAttributes.heading2 = {
  breakOnReturn: true,
  group: false,
  tagName: "h3",
  terminal: true
}

Trix.config.textAttributes.red = {
  inheritable: true,
  tagName: "span",
  style: { color: "red" },
  parser: e => e.style.color == "red"
}

// On trix-initialize: Fires when the <trix-editor> element is attached to the DOM and its editor object is ready for use.
document.addEventListener("trix-initialize", function(event) {
  // Add the new heading2 button in the Trix toolbar
  var buttonHeading2 = '<button type="button" class="trix-button" data-trix-attribute="heading2" title="Heading 2" tabindex="-1">Subtitle</button>'
  event.target.toolbarElement.querySelector("[data-trix-button-group='block-tools']").insertAdjacentHTML("beforeend", buttonHeading2)

  // Add the new red color button in the Trix toolbar
  var buttonRed = '<button type="button" class="trix-button" data-trix-attribute="red" title="Red" tabindex="-1">Red</button>'
  event.target.toolbarElement.querySelector("[data-trix-button-group='text-tools']").insertAdjacentHTML("beforeend", buttonRed)
})