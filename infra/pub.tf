data "google_pubsub_topic" "guardar-guia-pin" {
  name    = "guardar-guia-pin"
  project = var.project_suite
}

resource "google_pubsub_topic" "topic-pin-trigger" {
  name    = "pin-trigger"
  project = var.project
}