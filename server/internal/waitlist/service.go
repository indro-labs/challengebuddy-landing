package waitlist

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Entry struct {
	ID        string `json:"id"`
	Email     string `json:"email"`
	CreatedAt string `json:"created_at"`
}

type service struct {
	db *pgxpool.Pool
}

func newService(db *pgxpool.Pool) *service {
	return &service{db: db}
}

func (s *service) add(ctx context.Context, email string) (*Entry, error) {
	var e Entry
	err := s.db.QueryRow(ctx,
		`INSERT INTO waitlist_emails (email)
		 VALUES ($1)
		 ON CONFLICT (email) DO NOTHING
		 RETURNING id, email, created_at::text`,
		email,
	).Scan(&e.ID, &e.Email, &e.CreatedAt)
	if err != nil {
		return nil, fmt.Errorf("add waitlist entry: %w", err)
	}
	return &e, nil
}

func (s *service) list(ctx context.Context) ([]Entry, error) {
	rows, err := s.db.Query(ctx,
		`SELECT id, email, created_at::text FROM waitlist_emails ORDER BY created_at DESC`,
	)
	if err != nil {
		return nil, fmt.Errorf("list waitlist: %w", err)
	}
	defer rows.Close()

	var entries []Entry
	for rows.Next() {
		var e Entry
		if err := rows.Scan(&e.ID, &e.Email, &e.CreatedAt); err != nil {
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
