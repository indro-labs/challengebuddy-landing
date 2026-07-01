package waitlist

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Entry struct {
	ID        string  `json:"id"`
	Email     string  `json:"email"`
	Animal    *string `json:"animal,omitempty"`
	Color     *string `json:"color,omitempty"`
	CreatedAt string  `json:"created_at"`
}

type service struct {
	db *pgxpool.Pool
}

func newService(db *pgxpool.Pool) *service {
	return &service{db: db}
}

// animal and color are optional gear-picker choices from the claim flow; pass
// "" when unknown (e.g. the plain email-only waitlist form) to store NULL.
func (s *service) add(ctx context.Context, email, animal, color string) (*Entry, error) {
	var animalArg, colorArg *string
	if animal != "" {
		animalArg = &animal
	}
	if color != "" {
		colorArg = &color
	}

	var e Entry
	err := s.db.QueryRow(ctx,
		`INSERT INTO waitlist_emails (email, animal, color)
		 VALUES ($1, $2, $3)
		 ON CONFLICT (email) DO UPDATE SET
		   animal = COALESCE(EXCLUDED.animal, waitlist_emails.animal),
		   color  = COALESCE(EXCLUDED.color, waitlist_emails.color)
		 RETURNING id, email, animal, color, created_at::text`,
		email, animalArg, colorArg,
	).Scan(&e.ID, &e.Email, &e.Animal, &e.Color, &e.CreatedAt)
	if err != nil {
		return nil, fmt.Errorf("add waitlist entry: %w", err)
	}
	return &e, nil
}

func (s *service) list(ctx context.Context) ([]Entry, error) {
	rows, err := s.db.Query(ctx,
		`SELECT id, email, animal, color, created_at::text FROM waitlist_emails ORDER BY created_at DESC`,
	)
	if err != nil {
		return nil, fmt.Errorf("list waitlist: %w", err)
	}
	defer rows.Close()

	var entries []Entry
	for rows.Next() {
		var e Entry
		if err := rows.Scan(&e.ID, &e.Email, &e.Animal, &e.Color, &e.CreatedAt); err != nil {
			return nil, fmt.Errorf("scan entry: %w", err)
		}
		entries = append(entries, e)
	}

	if entries == nil {
		entries = []Entry{}
	}

	return entries, nil
}

func (s *service) delete(ctx context.Context, id string) error {
	_, err := s.db.Exec(ctx, `DELETE FROM waitlist_emails WHERE id = $1`, id)
	if err != nil {
		return fmt.Errorf("delete waitlist entry: %w", err)
	}
	return nil
}
