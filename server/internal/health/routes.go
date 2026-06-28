package health

import (
	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

func RegisterRoutes(r chi.Router, db *pgxpool.Pool) {
	h := NewHandler(db)
	r.Get("/api/health", h.Check)
}
