<?php
session_start();
header('Content-Type: application/json');

// ik heb geen database, dus ik gebruik een sessie om de woorden op te slaan
if (!isset($_SESSION['words'])) {
    $_SESSION['words'] = [];
}

// Check of het en post request is.
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $word = trim($data['word'] ?? '');
    if ($word !== '') {
        $_SESSION['words'][] = htmlspecialchars($word);
    }
    echo json_encode(['status' => 'success', 'words' => $_SESSION['words']]);
    exit;
}

// Handle fetching words via GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode($_SESSION['words']);
    exit;
}
