# README

This is an project example to showcase the Ruby on Rails component Action Text.

[Following the guide on Ruby on Rails website](https://guides.rubyonrails.org/action_text_overview.html).

## Summary

### 1. Initialize project

Create a new rails project.

`rails new rails-action-text-example`

### 2. Article model

Create an Article model with only a title attribute.

```
rails g scaffold Article title:string
rails db:migrate
```

> There's no need to add the content column to your Article table. has_rich_text associates the content with the action_text_rich_texts table that has been created, and links it back to your model. You also may choose to name the attribute to be something different from content.

https://guides.rubyonrails.org/action_text_overview.html#creating-rich-text-content

### 3. Install action text

* Installs the JavaScript packages for trix and @rails/actiontext and adds them to the application.js.
* Adds the image_processing gem for analysis and transformations of the embedded images and other attachments with Active Storage. Please refer to the Active Storage Overview guide for more information about it.
* Adds migrations to create the following tables that store rich text content and attachments: action_text_rich_texts, active_storage_blobs, active_storage_attachments, active_storage_variant_records.
* Creates actiontext.css which includes all Trix styles and overrides.
* Adds the default view partials _content.html and _blob.html to render Action Text content and Active Storage attachment (aka blob) respectively.

```
rails action_text:install
bundle // Install new dependencies
rails db:migrate
```

### 4. Fix images not loading properly

When uploading an image within your rich text editor, it uses Action Text which in turn uses Active Storage. However, [][Active Storage has some dependencies](https://guides.rubyonrails.org/active_storage_overview.html#requirements) which are not provided by Rails. To use the built-in previewers, you must install these libraries.

Some, but not all of these libraries are required and they are dependent on the kind of uploads you are expecting within the editor. A common error that users encounter when working with Action Text and Active Storage is that images do not render correctly in the editor. This is usually due to the `libvips` dependency not being installed.

```
brew install vips // MacOS
```

https://guides.rubyonrails.org/action_text_overview.html#active-storage
https://www.libvips.org/install.html

### 5. Add content to Article

Attached content to Article model.

```
# app/models/article.rb
class Article < ApplicationRecord
  has_rich_text :content
end
```

Add attribute to allowed parameters in order to save the content.

```
# app/controllers/articles_controller.rb
def article_params
  params.expect(article: [ :title, :content ])
end
```

Show the content attribute in the views.

```
# app/views/articles/_article.html.erb
<p>
  <strong>Content:</strong>
  <%= article.content %>
</p>
```

Add a text area in article's form to edit the content. Trix is automatically attached to it.

```
# app/views/articles/_form_.html.erb
<div class="field">
  <%= form.label :content %>
  <%= form.rich_textarea :content %>
</div>
```

### 6. Customize Trix editor

#### 6.1 Update heading button in the Trix toolbar

Replace h1 tag by h2 for the heading button since h1 is reserved for the title of the page.

Create a folder `custom_trix` in `app/javascript`, then create a file `custom_toolbar.js`.

>Creating the foler and file is optional, you can place everything in `app/javascript/application.js` if you want. It is just more organized.

```
// app/javascript/custom_trix/custom_toolbar.js
Trix.config.blockAttributes.heading1 = {
  breakOnReturn: true,
  group: false,
  tagName: "h2",
  terminal: true
}
```

Pin your new file on importmap, and import it in application.js.

```
# config/importmap.rb
pin_all_from "app/javascript/custom_trix", under: "custom_trix"

# app/javascript/application.js
import "custom_trix/custom_toolbar"
```

Last, update CSS to keep the heading font size. Search for `.trix-content h1` and simply add `,h2`.

```
// app/assets/stylesheets/actiontext.css
.trix-content h1,h2 {
  font-size: 1.2em;
  line-height: 1.2;
}
```

#### 6.2 Add a subheading button in the Trix toolbar

Configure a new heading button for the Trix toolbar. This button creates a new h3 tag (like subtitle).

```
// app/javascript/custom_trix/custom_toolbar.js
Trix.config.blockAttributes.heading2 = {
  breakOnReturn: true,
  group: false,
  tagName: "h3",
  terminal: true
}
```

Then Add the new button in the Trix toolbar.

```
// app/javascript/custom_trix/custom_toolbar.js
// On trix-initialize: Fires when the <trix-editor> element is attached to the DOM and its editor object is ready for use.
document.addEventListener("trix-initialize", function(event) {
  var buttonHeading2 = '<button type="button" class="trix-button" data-trix-attribute="heading2" title="Heading 2" tabindex="-1">Subtitle</button>'
  event.target.toolbarElement.querySelector("[data-trix-button-group='block-tools']").insertAdjacentHTML("beforeend", buttonHeading2)
})
```

Add a CSS style for the new h3 tag to make it smaller than h1 and h2.

```
// app/assets/stylesheets/actiontext.css
.trix-content h3 {
  font-size: 1.1em;
  line-height: 1.2;
}
```

#### 6.3 Add a button to apply red color to the selected text

```
// app/javascript/custom_trix/custom_toolbar.js
Trix.config.textAttributes.red = {
  inheritable: true,
  tagName: "span",
  style: { color: "red" },
  parser: e => e.style.color == "red"
}

// Add those two lines in the previous document.addEventListener("trix-initialize", function(event) {...})
var buttonRed = '<button type="button" class="trix-button" data-trix-attribute="red" title="Red" tabindex="-1">Red</button>'
event.target.toolbarElement.querySelector("[data-trix-button-group='text-tools']").insertAdjacentHTML("beforeend", buttonRed)
```

To allow rails to render the HTML style attribute, we need to initialize the "Allowed attributes" for Action Text. Otherwise the attribute is saved but striped during the renderering.

To do so, create a file `action_text.rb` in `config/initializers`.

Then combines the default allowed tags and attributes from the sanitizer class with the tags and attributes from ActionText::Attachment and assigns them to default_allowed_tags and default_allowed_attributes.

```
# config/initializers/action_text.rb
sanitizer = Rails::HTML5::Sanitizer.safe_list_sanitizer.new
default_allowed_tags = sanitizer.class.allowed_tags + [ ActionText::Attachment.tag_name, "figure", "figcaption" ]
default_allowed_attributes = sanitizer.class.allowed_attributes + ActionText::Attachment::ATTRIBUTES

ActionText::ContentHelper.allowed_tags = default_allowed_tags.merge(["embed"])
ActionText::ContentHelper.allowed_attributes = default_allowed_attributes.merge(["style"])
```

## What next
- [ ] Replace buttons accordingly
- [ ] Find new icons
- [ ] Create a color switcher for foreground and background text color
