<?php
$host = getenv('DB_HOST') ?: 'postgres';
$db   = getenv('DB_NAME') ?: 'microdb';
$user = getenv('DB_USER') ?: 'user';
$pass = getenv('DB_PASSWORD') ?: 'password';
$pass = getenv('DB_PORT') ?: '5432';

try {
    $dsn = "pgsql:host=$host;port=$port;dbname=$db;";
    $pdo = new PDO($dsn, $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

    // Calculer la somme et le nombre total
    $stmt = $pdo->query("SELECT COUNT(*) as total_entries, SUM(value) as total_sum, AVG(value) as average_value FROM entries");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    echo "<h1>Résumé des données</h1>";
    echo "<p>Total d'enregistrements : " . $result['total_entries'] . "</p>";
    echo "<p>Somme totale : " . $result['total_sum'] . "</p>";
    echo "<p>Moyenne : " . number_format($result['average_value'], 2) . "</p>";

} catch (PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
}
?>

