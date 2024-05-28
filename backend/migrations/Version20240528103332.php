<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240528103332 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE stats_event_purchase (id INT AUTO_INCREMENT NOT NULL, event_id INT DEFAULT NULL, count INT NOT NULL, INDEX IDX_3BC2D7CE71F7E88B (event_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE stats_event_purchase ADD CONSTRAINT FK_3BC2D7CE71F7E88B FOREIGN KEY (event_id) REFERENCES event_jo (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE stats_event_purchase DROP FOREIGN KEY FK_3BC2D7CE71F7E88B');
        $this->addSql('DROP TABLE stats_event_purchase');
    }
}
