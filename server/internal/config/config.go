package config

import (
	"fmt"
	"os"
)

type Config struct {
	Port        string
	DatabaseURL string
	CORSOrigin  string
	AdminAPIKey string
	Env         string
}

func Load() (*Config, error) {
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		return nil, fmt.Errorf("DATABASE_URL is required")
	}

	adminKey := os.Getenv("ADMIN_API_KEY")
	if adminKey == "" {
		return nil, fmt.Errorf("ADMIN_API_KEY is required")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}

	env := os.Getenv("ENV")
	if env == "" {
		env = "development"
	}

	corsOrigin := os.Getenv("CORS_ORIGIN")
	if corsOrigin == "" {
		corsOrigin = "http://localhost:5173"
	}

	return &Config{
		Port:        port,
		DatabaseURL: dbURL,
		CORSOrigin:  corsOrigin,
		AdminAPIKey: adminKey,
		Env:         env,
	}, nil
}
