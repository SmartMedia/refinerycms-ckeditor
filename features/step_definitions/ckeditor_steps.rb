Then /^I should see CKeditor$/ do
  if page.respond_to? :should
    page.should have_selector('textarea.wymeditor')
  else
    assert page.have_selector('textarea.wymeditor')
  end
end
