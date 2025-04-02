<?php
session_start();
header('Content-Type: application/json');

// ik heb geen database, dus ik gebruik een sessie om de woorden op te slaan
if (!isset($_SESSION['words'])) {
    $_SESSION['words'] = [];
}

// Check of het en post request is.
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // we versturen json data door via javascript en dat komt binnen via php://input
    // we decoderen de json data naar een array
    $data = json_decode(file_get_contents('php://input'), true);
    
    // spaties eraf
    $word = trim($data['word'] ?? '');

    // check of het woord al bestaat in de array
    if ($word !== '') {
        $_SESSION['words'][] = htmlspecialchars($word);
    }
    echo json_encode(['status' => 'success', 'words' => $_SESSION['words']]);
    exit;
}

// Get request voor het ophalen van de woorden.
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode($_SESSION['words']);
    exit;
}
