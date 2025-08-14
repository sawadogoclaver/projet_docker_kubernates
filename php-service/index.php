<?php
$host = getenv('DB_HOST') ?: 'postgres';
$db   = getenv('DB_NAME') ?: 'microdb';
$user = getenv('DB_USER') ?: 'user';
$pass = getenv('DB_PASSWORD') ?: 'password';

$conn = pg_connect("host=$host dbname=$db user=$user password=$pass");
$result = pg_query($conn, "SELECT COUNT(*) AS total, AVG(value) AS avg_value FROM records");
$data = pg_fetch_assoc($result);

echo "<h1>Résumé des données</h1>";
echo "Nombre total d'entrées : " . $data['total'] . "<br>";
echo "Valeur moyenne : " . round($data['avg_value'], 2) . "<br>";
?>
