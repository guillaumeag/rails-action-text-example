# This initializer configures ActionText to allow specific HTML attributes.
# The `allowed_attributes` setting is used to specify which attributes are permitted
# in the HTML content managed by ActionText. In this case, only the "style" attribute
# is allowed.
#
# NOTE FROM RAILS 7.1.0 CHANGELOG:
# Use Rails::HTML5::SafeListSanitizer by default in the Rails 7.1 configuration if it is supported.
# Action Text's sanitizer can be configured by setting config.action_text.sanitizer_vendor.
# Supported values are Rails::HTML4::Sanitizer or Rails::HTML5::Sanitizer.
# The Rails 7.1 configuration will set this to Rails::HTML5::Sanitizer when it is supported,
# and fall back to Rails::HTML4::Sanitizer. Previous configurations default to Rails::HTML4::Sanitizer.
#
# As a result of this change, the defaults for ActionText::ContentHelper.allowed_tags and .allowed_attributes are applied at runtime,
# so the value of these attributes is now 'nil' unless set by the application.
# You may call sanitizer_allowed_tags or sanitizer_allowed_attributes to inspect the tags and attributes being allowed by the sanitizer.

# Combines the default allowed attributes from the sanitizer class with the attributes
# from ActionText::Attachment and assigns them to default_allowed_attributes.
sanitizer = Rails::HTML5::Sanitizer.safe_list_sanitizer.new
default_allowed_tags = sanitizer.class.allowed_tags + [ ActionText::Attachment.tag_name, "figure", "figcaption" ]
default_allowed_attributes = sanitizer.class.allowed_attributes + ActionText::Attachment::ATTRIBUTES

# Assigns the new allowed attributes to ActionText::ContentHelper.allowed_attributes.
# This ensures that the sanitizer allows the necessary attributes for ActionText content.
# ActionText::ContentHelper.allowed_tags = default_allowed_tags.merge(["embed"])
ActionText::ContentHelper.allowed_attributes = default_allowed_attributes.merge(["style"])

