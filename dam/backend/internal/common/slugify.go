package common

import (
	"regexp"
	"strings"
)

var (
	nonAlphanumeric = regexp.MustCompile(`[^a-z0-9-]+`)
	whitespace      = regexp.MustCompile(`\s+`)
	dashes          = regexp.MustCompile(`-+`)
)

func Slugify(s string) string {
	slug := strings.ToLower(s)
	slug = whitespace.ReplaceAllString(slug, "-")
	slug = nonAlphanumeric.ReplaceAllString(slug, "")
	slug = dashes.ReplaceAllString(slug, "-")
	slug = strings.Trim(slug, "-")
	return slug
}