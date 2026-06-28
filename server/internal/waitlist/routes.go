package waitlist

import (
	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

func RegisterRoutes(r chi.Router, db *pgxpool.Pool, adminAPIKey string) {
	h := newHandler(db, adminAPIKey)

	r.Post("/api/waitlist", h.add)
	r.Get("/api/waitlist", h.list)
	r.Delete("/api/waitlist/{id}", h.delete)
}
