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
        // récupération de la clé secrète de Stripe depuis le .env
        $stripeSecretKey = $_ENV['STRIPE_SECRET_KEY'];

        Stripe::setApiKey($stripeSecretKey);

        $paymentIntent = PaymentIntent::create([
            'amount' => 1000,
            'currency' => 'EUR',
        ]);

        return $this->json(['clientSecret' => $paymentIntent->client_secret]);
    }
}
