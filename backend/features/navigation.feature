Feature: Navigation
  Scenario: Visitor can't access the admin panel
    Given I am on "/"
    When I go to "/admin"
    Then I should be on "/login"
