<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240428143326 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE accompagnant ADD main_user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE accompagnant ADD CONSTRAINT FK_C9D827FF53257A7C FOREIGN KEY (main_user_id) REFERENCES `user` (id)');
        $this->addSql('CREATE INDEX IDX_C9D827FF53257A7C ON accompagnant (main_user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE accompagnant DROP FOREIGN KEY FK_C9D827FF53257A7C');
        $this->addSql('DROP INDEX IDX_C9D827FF53257A7C ON accompagnant');
        $this->addSql('ALTER TABLE accompagnant DROP main_user_id');
    }
}
