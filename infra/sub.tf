resource "google_pubsub_subscription" "sub-tracking-almacenar-pin-guia-gke" {
  ack_deadline_seconds       = "10"
  message_retention_duration = "900s"
  name                       = "sub-tracking-almacenar-pin-guia-gke"
  project                    = var.project_suite
  expiration_policy {
    ttl = ""
  }

  retry_policy {
    minimum_backoff = "10s"
    maximum_backoff = "30s"
  }

  push_config {
    push_endpoint = "https://${var.host}/${var.service_name}/"
  }

  retain_acked_messages = "false"
  topic                 = data.google_pubsub_topic.guardar-guia-pin.name
}

resource "google_pubsub_subscription" "sub-tracking-pin-guia-trigger" {
  ack_deadline_seconds       = "10"
  message_retention_duration = "900s"
  name                       = "sub-tracking-pin-guia-trigger"
  project                    = var.project
  expiration_policy {
    ttl = ""
  }

  retry_policy {
    minimum_backoff = "10s"
    maximum_backoff = "30s"
  }

  push_config {
    push_endpoint = "https://${var.host}/${var.service_name}/trigger"
  }

  retain_acked_messages = "false"
  topic                 = google_pubsub_topic.topic-pin-trigger.name
}
