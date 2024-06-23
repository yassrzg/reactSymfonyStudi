<?php

namespace App\Tests\Behat;

use Behat\Behat\Context\Context;
use Behat\MinkExtension\Context\MinkContext;

class FeatureContext extends MinkContext implements Context
{
    public function __construct()
    {
        $this->useSession('panther'); // Utilisez la session Panther si configurée
    }

    /**
     * @Given I am on :path
     */
    public function iAmOn($path)
    {
        $this->visitPath($path);
    }

    /**
     * @When I go to :path
     */
    public function iGoTo($path)
    {
        $this->visitPath($path);
    }

    /**
     * @Then I should be on :path
     */
    public function iShouldBeOn($path)
    {
        $currentUrl = $this->getSession()->getCurrentUrl();
        $baseUrl = $this->getMinkParameter('base_url');
        $expectedUrl = rtrim($baseUrl, '/') . $path;

        if ($currentUrl !== $expectedUrl) {
            throw new \Exception("Expected to be on $expectedUrl, but was on $currentUrl");
        }
    }

    /**
     * @Then I should see :text
     */
    public function iShouldSee($text)
    {
        $this->assertPageContainsText($text);
    }
}
