<?php

namespace App\Controller;

use Stripe\PaymentIntent;
use Stripe\Stripe;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PaymentController extends AbstractController
{
    #[Route('/api/payment', name: 'app_payment')]
    public function index(): Response
    {
        $stripeSecretKey = $_ENV['STRIPE_SECRET_KEY'];

// Set the Stripe API key
        Stripe::setApiKey($stripeSecretKey);

        $paymentIntent = PaymentIntent::create([
            'amount' => 1000, // $10.00, this amount should be in cents
            'currency' => 'EUR',
        ]);

        return $this->json(['clientSecret' => $paymentIntent->client_secret]);
    }
}
