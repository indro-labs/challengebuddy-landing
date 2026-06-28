package server

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	chimiddleware "github.com/go-chi/chi/v5/middleware"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/indrolabs/challengebuddy-landing/internal/config"
	"github.com/indrolabs/challengebuddy-landing/internal/health"
	"github.com/indrolabs/challengebuddy-landing/internal/middleware"
	"github.com/indrolabs/challengebuddy-landing/internal/waitlist"
)

func New(cfg *config.Config, db *pgxpool.Pool) *http.Server {
	r := chi.NewRouter()

	r.Use(chimiddleware.Logger)
	r.Use(chimiddleware.Recoverer)
	r.Use(middleware.CORS(cfg.CORSOrigin))

	health.RegisterRoutes(r, db)
	waitlist.RegisterRoutes(r, db, cfg.AdminAPIKey)

	return &http.Server{
		Addr:    fmt.Sprintf(":%s", cfg.Port),
		Handler: r,
	}
}
