# This initializer configures ActionText to allow specific HTML attributes.
# The `allowed_attributes` setting is used to specify which attributes are permitted
# in the HTML content managed by ActionText. In this case, only the "style" attribute
# is allowed.
#
# There two ways to configure the allowed attributes:
# 1. By setting the `allowed_attributes` attribute directly on the `ActionText::ContentHelper` module.
# 2. By modifying the `ActionText::Attachment::ATTRIBUTES` constant to include the desired attribute.
ActionText::ContentHelper.allowed_attributes = ["style"]
