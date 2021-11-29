<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211118155715 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE vivienda (id INT AUTO_INCREMENT NOT NULL, contrato INT DEFAULT NULL, titular VARCHAR(255) DEFAULT NULL, cp INT DEFAULT NULL, municipio VARCHAR(255) DEFAULT NULL, localidad VARCHAR(255) DEFAULT NULL, tipo_via VARCHAR(255) DEFAULT NULL, nombre_via VARCHAR(255) DEFAULT NULL, num_portal VARCHAR(255) DEFAULT NULL, bloque INT DEFAULT NULL, escalera VARCHAR(255) DEFAULT NULL, piso VARCHAR(255) DEFAULT NULL, puerta VARCHAR(255) DEFAULT NULL, observaciones_direccion VARCHAR(255) DEFAULT NULL, telefono1 VARCHAR(255) DEFAULT NULL, telefono2 VARCHAR(255) DEFAULT NULL, telefono3 VARCHAR(255) DEFAULT NULL, telefono4 VARCHAR(255) DEFAULT NULL, complemento1 VARCHAR(255) DEFAULT NULL, complemento2 VARCHAR(255) DEFAULT NULL, tipo VARCHAR(255) DEFAULT NULL, estado VARCHAR(255) DEFAULT NULL, referencia VARCHAR(255) DEFAULT NULL, uso_abastecimiento VARCHAR(255) DEFAULT NULL, uso_residuos VARCHAR(255) DEFAULT NULL, campaña_anterior VARCHAR(255) DEFAULT NULL, campaña_actual VARCHAR(255) DEFAULT NULL, primera_visita VARCHAR(255) DEFAULT NULL, segunda_visita VARCHAR(255) DEFAULT NULL, observaciones VARCHAR(255) DEFAULT NULL, fecha_visita DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE vivienda');
    }
}
