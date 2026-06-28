package middleware

import (
	"net/http"

	"github.com/rs/cors"
)

func CORS(allowedOrigin string) func(http.Handler) http.Handler {
	c := cors.New(cors.Options{
		AllowedOrigins: []string{allowedOrigin},
		AllowedMethods: []string{"GET", "POST", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Authorization", "Content-Type"},
	})
	return c.Handler
}
