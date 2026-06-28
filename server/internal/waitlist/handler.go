// POST /api/waitlist        — add an email to the waitlist (public)
// GET  /api/waitlist        — list all entries (admin, requires ADMIN_API_KEY header)
// DELETE /api/waitlist/{id} — remove an entry (admin, requires ADMIN_API_KEY header)
package waitlist

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type handler struct {
	svc        *service
	adminAPIKey string
}

func newHandler(db *pgxpool.Pool, adminAPIKey string) *handler {
	return &handler{svc: newService(db), adminAPIKey: adminAPIKey}
}

func (h *handler) add(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Email string `json:"email"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid request body"})
		return
	}

	body.Email = strings.TrimSpace(strings.ToLower(body.Email))
	if body.Email == "" || !strings.Contains(body.Email, "@") {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "valid email is required"})
		return
	}

	entry, err := h.svc.add(r.Context(), body.Email)
	if err != nil {
		// ON CONFLICT DO NOTHING returns no rows — treat as already registered (still success)
		if entry == nil {
			writeJSON(w, http.StatusOK, map[string]string{"message": "already on the waitlist"})
			return
		}
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "something went wrong"})
		return
	}

	writeJSON(w, http.StatusCreated, entry)
}

func (h *handler) list(w http.ResponseWriter, r *http.Request) {
	if !h.isAdmin(r) {
		writeJSON(w, http.StatusUnauthorized, map[string]string{"error": "unauthorized"})
		return
	}

	entries, err := h.svc.list(r.Context())
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "something went wrong"})
		return
	}

	writeJSON(w, http.StatusOK, entries)
}

func (h *handler) delete(w http.ResponseWriter, r *http.Request) {
	if !h.isAdmin(r) {
		writeJSON(w, http.StatusUnauthorized, map[string]string{"error": "unauthorized"})
		return
	}

	id := chi.URLParam(r, "id")
	if err := h.svc.delete(r.Context(), id); err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "something went wrong"})
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *handler) isAdmin(r *http.Request) bool {
	key := r.Header.Get("X-Admin-Key")
	return key == h.adminAPIKey
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(v)
}
