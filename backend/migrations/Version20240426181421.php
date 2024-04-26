<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240426181421 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE qr_code_accompagnant ADD accompagnant_user_id INT DEFAULT NULL, ADD is_used TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE qr_code_accompagnant ADD CONSTRAINT FK_44F003E51F27F4 FOREIGN KEY (accompagnant_user_id) REFERENCES accompagnant (id)');
        $this->addSql('CREATE INDEX IDX_44F003E51F27F4 ON qr_code_accompagnant (accompagnant_user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE qr_code_accompagnant DROP FOREIGN KEY FK_44F003E51F27F4');
        $this->addSql('DROP INDEX IDX_44F003E51F27F4 ON qr_code_accompagnant');
        $this->addSql('ALTER TABLE qr_code_accompagnant DROP accompagnant_user_id, DROP is_used');
    }
}
