<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240528101256 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE event_jo DROP FOREIGN KEY FK_CD0862C0349A06BA');
        $this->addSql('CREATE TABLE stat_event_purchase (id INT AUTO_INCREMENT NOT NULL, event_id INT DEFAULT NULL, count INT NOT NULL, INDEX IDX_1015A8EE71F7E88B (event_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE stat_event_purchase ADD CONSTRAINT FK_1015A8EE71F7E88B FOREIGN KEY (event_id) REFERENCES event_jo (id)');
        $this->addSql('DROP TABLE event_purchase_stat');
        $this->addSql('DROP INDEX IDX_CD0862C0349A06BA ON event_jo');
        $this->addSql('ALTER TABLE event_jo DROP event_purchase_stat_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE event_purchase_stat (id INT AUTO_INCREMENT NOT NULL, count_of_purchase INT NOT NULL, event_id INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE stat_event_purchase DROP FOREIGN KEY FK_1015A8EE71F7E88B');
        $this->addSql('DROP TABLE stat_event_purchase');
        $this->addSql('ALTER TABLE event_jo ADD event_purchase_stat_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE event_jo ADD CONSTRAINT FK_CD0862C0349A06BA FOREIGN KEY (event_purchase_stat_id) REFERENCES event_purchase_stat (id)');
        $this->addSql('CREATE INDEX IDX_CD0862C0349A06BA ON event_jo (event_purchase_stat_id)');
    }
}
