package common

import (
	"regexp"
	"strings"
)

var (
	nonAlphanumericHyphenRegex = regexp.MustCompile(`[^a-z0-9-]+`)
	whitespaceRegex            = regexp.MustCompile(`\s+`)
	hyphenRegex                = regexp.MustCompile(`-+`)
)

// Slugify generates a simple slug (lowercase, hyphens)
func Slugify(s string) string {
	if s == "" {
		return ""
	}

	slug := strings.ToLower(s)
	slug = whitespaceRegex.ReplaceAllString(slug, "-")            // Replace whitespace with hyphen
	slug = nonAlphanumericHyphenRegex.ReplaceAllString(slug, "-") // Replace non-alphanumeric with hyphen
	slug = strings.Trim(slug, "-")                                // Trim leading/trailing hyphens
	slug = hyphenRegex.ReplaceAllString(slug, "-")                // Remove consecutive hyphens

	return slug
}
