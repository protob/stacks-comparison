package api

import (
	"github.com/danielgtaylor/huma/v2"
	"github.com/danielgtaylor/huma/v2/adapters/humachi"
	"github.com/go-chi/chi/v5"
)

// SetupHumaAPI configures the Huma API for automatic OpenAPI documentation
// This creates /docs and /openapi.json endpoints automatically
func SetupHumaAPI(router chi.Router) huma.API {
	config := huma.DefaultConfig("DAM API", "1.0.0")
	config.Info.Description = "Digital Audio Manager - AI music pre-staging and review system"
	config.Servers = []*huma.Server{
		{URL: "http://localhost:3000"},
	}

	// Create Huma API with Chi adapter
	api := humachi.New(router, config)

	// Add contact info
	api.OpenAPI().Info.Contact = &huma.Contact{
		Name: "DAM Support",
	}

	return api
}
