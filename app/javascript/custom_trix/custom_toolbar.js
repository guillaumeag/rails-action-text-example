// Update heading button in the Trix toolbar
// Replace h1 tag by h2 since h1 is reserved for the title of the page
Trix.config.blockAttributes.heading1 = {
  breakOnReturn: true,
  group: false,
  tagName: "h2",
  terminal: true
}