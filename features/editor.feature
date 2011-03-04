@refinerycms @wymeditor
Feature: Test Wymeditor
  In order to see if ckeditor is loaded properly
  As an administrator
  I want to verify create page
  
  Background:
    Given I am a logged in refinery user
    And I have no pages

  Scenario: Create Valid Page
    When I go to the list of pages
    And I follow "Add new page"
    Then I should see CKeditor