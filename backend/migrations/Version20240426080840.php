<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240426080840 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE event_categories DROP FOREIGN KEY FK_621D9F47A70941B2');
        $this->addSql('ALTER TABLE event_categories DROP FOREIGN KEY FK_621D9F47AEFED2AA');
        $this->addSql('ALTER TABLE categories_event_event_jo DROP FOREIGN KEY FK_3A1B0884A70941B2');
        $this->addSql('ALTER TABLE categories_event_event_jo DROP FOREIGN KEY FK_3A1B0884AEFED2AA');
        $this->addSql('DROP TABLE event_categories');
        $this->addSql('DROP TABLE categories_event_event_jo');
        $this->addSql('ALTER TABLE event_jo ADD category_id INT NOT NULL');
        $this->addSql('ALTER TABLE event_jo ADD CONSTRAINT FK_CD0862C012469DE2 FOREIGN KEY (category_id) REFERENCES categories_event (id)');
        $this->addSql('CREATE INDEX IDX_CD0862C012469DE2 ON event_jo (category_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE event_categories (event_jo_id INT NOT NULL, categories_event_id INT NOT NULL, INDEX IDX_621D9F47AEFED2AA (event_jo_id), INDEX IDX_621D9F47A70941B2 (categories_event_id), PRIMARY KEY(event_jo_id, categories_event_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE categories_event_event_jo (categories_event_id INT NOT NULL, event_jo_id INT NOT NULL, INDEX IDX_3A1B0884AEFED2AA (event_jo_id), INDEX IDX_3A1B0884A70941B2 (categories_event_id), PRIMARY KEY(categories_event_id, event_jo_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE event_categories ADD CONSTRAINT FK_621D9F47A70941B2 FOREIGN KEY (categories_event_id) REFERENCES categories_event (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE event_categories ADD CONSTRAINT FK_621D9F47AEFED2AA FOREIGN KEY (event_jo_id) REFERENCES event_jo (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE categories_event_event_jo ADD CONSTRAINT FK_3A1B0884A70941B2 FOREIGN KEY (categories_event_id) REFERENCES categories_event (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE categories_event_event_jo ADD CONSTRAINT FK_3A1B0884AEFED2AA FOREIGN KEY (event_jo_id) REFERENCES event_jo (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE event_jo DROP FOREIGN KEY FK_CD0862C012469DE2');
        $this->addSql('DROP INDEX IDX_CD0862C012469DE2 ON event_jo');
        $this->addSql('ALTER TABLE event_jo DROP category_id');
    }
}
