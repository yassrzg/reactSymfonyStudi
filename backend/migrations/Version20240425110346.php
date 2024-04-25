<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240425110346 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE categories_event (id INT AUTO_INCREMENT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE categories_event_event_jo (categories_event_id INT NOT NULL, event_jo_id INT NOT NULL, INDEX IDX_3A1B0884A70941B2 (categories_event_id), INDEX IDX_3A1B0884AEFED2AA (event_jo_id), PRIMARY KEY(categories_event_id, event_jo_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE categories_event_event_jo ADD CONSTRAINT FK_3A1B0884A70941B2 FOREIGN KEY (categories_event_id) REFERENCES categories_event (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE categories_event_event_jo ADD CONSTRAINT FK_3A1B0884AEFED2AA FOREIGN KEY (event_jo_id) REFERENCES event_jo (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE event_jo ADD price_offert_famille DOUBLE PRECISION NOT NULL, ADD stockage DOUBLE PRECISION DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE categories_event_event_jo DROP FOREIGN KEY FK_3A1B0884A70941B2');
        $this->addSql('ALTER TABLE categories_event_event_jo DROP FOREIGN KEY FK_3A1B0884AEFED2AA');
        $this->addSql('DROP TABLE categories_event');
        $this->addSql('DROP TABLE categories_event_event_jo');
        $this->addSql('ALTER TABLE event_jo DROP price_offert_famille, DROP stockage');
    }
}
