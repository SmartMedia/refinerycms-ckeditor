module CkeditorHelper
  include ActionView::Helpers::FormTagHelper
  
  def editor_tag(name, content = nil, options = {})
    options[:class] = options[:class].to_s + ' ckeditor'
    text_area_tag name, content, options
  end
  
  def editor_assets
    render '/admin/pages/editor_assets'
  end
  
end

