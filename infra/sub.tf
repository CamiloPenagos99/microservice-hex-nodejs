resource "google_pubsub_subscription" "sub-tracking-almacenar-pin-guia" {
  ack_deadline_seconds       = "10"
  message_retention_duration = "900s"
  name                       = "sub-tracking-almacenar-pin-guia"
  project                    = var.project_suite
  expiration_policy {
    ttl = ""
  }

  retry_policy {
    minimum_backoff = "10s"
    maximum_backoff = "30s"
  }

  push_config {
    push_endpoint = data.google_cloud_run_service.cm-tracking-almacenar-pin-guia.status[0].url
  }

  retain_acked_messages = "false"
  topic                 = data.google_pubsub_topic.guardar-guia-pin.name
}
