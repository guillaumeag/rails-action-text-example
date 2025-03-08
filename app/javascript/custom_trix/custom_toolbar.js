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

// On trix-initialize: Fires when the <trix-editor> element is attached to the DOM and its editor object is ready for use.
// Add the new heading2 button in the Trix toolbar
document.addEventListener("trix-initialize", function(event) {
  var buttonHeading2 = '<button type="button" class="trix-button" data-trix-attribute="heading2" title="Heading 2" tabindex="-1">Subtitle</button>'
  event.target.toolbarElement.querySelector("[data-trix-button-group='block-tools']").insertAdjacentHTML("beforeend", buttonHeading2)
})