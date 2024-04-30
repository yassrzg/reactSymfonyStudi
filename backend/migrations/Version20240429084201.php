<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240429084201 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE accompagnant_event_jo (accompagnant_id INT NOT NULL, event_jo_id INT NOT NULL, INDEX IDX_F7FF42FA8A141997 (accompagnant_id), INDEX IDX_F7FF42FAAEFED2AA (event_jo_id), PRIMARY KEY(accompagnant_id, event_jo_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE accompagnant_event_jo ADD CONSTRAINT FK_F7FF42FA8A141997 FOREIGN KEY (accompagnant_id) REFERENCES accompagnant (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE accompagnant_event_jo ADD CONSTRAINT FK_F7FF42FAAEFED2AA FOREIGN KEY (event_jo_id) REFERENCES event_jo (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE accompagnant_event_jo DROP FOREIGN KEY FK_F7FF42FA8A141997');
        $this->addSql('ALTER TABLE accompagnant_event_jo DROP FOREIGN KEY FK_F7FF42FAAEFED2AA');
        $this->addSql('DROP TABLE accompagnant_event_jo');
    }
}
